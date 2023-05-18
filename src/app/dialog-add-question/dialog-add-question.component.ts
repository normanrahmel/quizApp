import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmComponentComponent } from '../dialog-confirm-component/dialog-confirm-component.component';

@Component({
  selector: 'app-dialog-add-question',
  templateUrl: './dialog-add-question.component.html',
  styleUrls: ['./dialog-add-question.component.scss'],
})
export class DialogAddQuestionComponent {
  question: string = '';
  answer: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogAddQuestionComponent>,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addQuestion(): void {
    if (this.question.length > 0 && this.answer.length > 0) {
      this.dialogRef.close({ question: this.question, answer: this.answer });
      this.dialog.open(DialogConfirmComponentComponent);
    }
  }
}
