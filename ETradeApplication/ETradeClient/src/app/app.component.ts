import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerToastrService, ToastrMessageType, ToastrPosition } from './services/ui/customer-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadDirectiveDirective } from './directive/common/dynamic-load-directive.directive';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 @ViewChild(DynamicLoadDirectiveDirective, { static: true})
 dynamicLoadComponentDirective:DynamicLoadDirectiveDirective;

  constructor ( 
    public authService: AuthService, 
    public toastrService: CustomerToastrService,
    private router: Router,
    private dynamicLoadComponentService: DynamicLoadComponentService
    ) {
      
   authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatılmıştır!","Bilgilendirme", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
  
  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef)

  }
}

