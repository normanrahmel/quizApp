import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmComponentComponent } from './dialog-confirm-component.component';

describe('DialogConfirmComponentComponent', () => {
  let component: DialogConfirmComponentComponent;
  let fixture: ComponentFixture<DialogConfirmComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmComponentComponent]
    });
    fixture = TestBed.createComponent(DialogConfirmComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
