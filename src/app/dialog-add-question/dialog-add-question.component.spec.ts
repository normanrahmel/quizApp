import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddQuestionComponent } from './dialog-add-question.component';

describe('DialogAddQuestionComponent', () => {
  let component: DialogAddQuestionComponent;
  let fixture: ComponentFixture<DialogAddQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddQuestionComponent]
    });
    fixture = TestBed.createComponent(DialogAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
