import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubsUrls } from 'src/app/constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(
    private alerfity: AlertifyService, 
    spinner: NgxSpinnerService,
    private signalRService: SignalRService
    ) {
    super(spinner);
    //  signalRService.start(HubsUrls.OrderHub);  
    // signalRService.start(HubsUrls.ProductHub);
   
  }

  ngOnInit(): void {
    this.signalRService.on(HubsUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alerfity.message(message, {
        messageType : MessageType.Warning,
        positionType: PositionType.TopCenter
      })
    }); 
    this.signalRService.on(HubsUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alerfity.message(message, {
        messageType : MessageType.Warning,
        positionType: PositionType.TopCenter
      })
    }); 
  }

  m(){
    this.alerfity.message("Merhaba", {
      messageType: MessageType.Success,
      delay: 5,
      positionType : PositionType.TopRight,
    });
  }

  d(){
    this.alerfity.dismiss();
  }
}
