import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoadDirective]'
})
export class DynamicLoadDirectiveDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
