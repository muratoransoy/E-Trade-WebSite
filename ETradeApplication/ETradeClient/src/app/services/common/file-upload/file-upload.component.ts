import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from '../../ui/customer-toastr.service';
import { AlertifyService, MessageType, PositionType } from '../../admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import {FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertfiyService: AlertifyService,
    private customeToastrService: CustomerToastrService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  public files: NgxFileDropEntry[] = [];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallSpinFadeRotating)
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
    
          const message: string = "Dosyalar başarı ile yüklemiştir";
          this.spinner.hide(SpinnerType.BallSpinFadeRotating)
          if (this.options.isAdminPage) {
            this.alertfiyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              positionType: PositionType.TopRight
            })
          } else {
            this.customeToastrService.message(message, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            });
          }
          
        }, (errorResponse: HttpErrorResponse) => {
    
          const message: string = "Dosyalar yüklenirken beklenmedik bir hata ile karşılaşıldı!";
          this.spinner.hide(SpinnerType.BallSpinFadeRotating)
          if (this.options.isAdminPage) {
            this.alertfiyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Error,
              positionType: PositionType.TopRight
            })
          } else {
            this.customeToastrService.message(message, "Başarısız", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            });
          }
          
        });
      }
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation: string;
  accept?: string;
  isAdminPage?: boolean = false;
}


