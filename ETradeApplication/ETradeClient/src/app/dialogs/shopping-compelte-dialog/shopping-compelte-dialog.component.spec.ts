import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCompelteDialogComponent } from './shopping-compelte-dialog.component';

describe('ShoppingCompelteDialogComponent', () => {
  let component: ShoppingCompelteDialogComponent;
  let fixture: ComponentFixture<ShoppingCompelteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCompelteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCompelteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
