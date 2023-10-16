import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/List-Role';
import { UserService } from 'src/app/services/common/models/user.service';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private userService: UserService) {
    super(dialogRef)
  }
  roles: { datas: List_Role[], totalRoleCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
      this.spinner.show(SpinnerType.BallSpinFadeRotating);
     this.assignedRoles = await this.userService.getRolesToUser(this.data, ()=> this.spinner.hide(SpinnerType.BallSpinFadeRotating));
 
     this.roles = await this.roleService.getRoles(-1, -1);

     this.listRoles = this.roles.datas.map((r: any) => {
       return {
         name: r.name,
         selected: this.assignedRoles?.indexOf(r.name) > -1
       }
     });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._elementRef.nativeElement.innerText)
    this.spinner.show(SpinnerType.BallSpinFadeRotating);
    this.userService.assignRoleToUser(this.data, roles,
      () => {
        this.spinner.hide(SpinnerType.BallSpinFadeRotating);
      }, error => {

      })
  }
}





