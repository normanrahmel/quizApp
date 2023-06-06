/*import { Component } from '@angular/core';
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
*/
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmComponentComponent } from '../dialog-confirm-component/dialog-confirm-component.component';
import { DbService } from '../db.service';

@Component({
  selector: 'app-dialog-add-question',
  templateUrl: './dialog-add-question.component.html',
  styleUrls: ['./dialog-add-question.component.scss'],
})
export class DialogAddQuestionComponent {
  question: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  rightAnswer: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogAddQuestionComponent>,
    public dialog: MatDialog,
    private dbService: DbService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addQuestion(): void {
    if (
      this.question.length > 0 &&
      this.answer1.length > 0 &&
      this.answer2.length > 0 &&
      this.answer3.length > 0 &&
      this.answer4.length > 0 &&
      this.rightAnswer > 0
    ) {
      this.dbService.createQuestion({
        question: this.question,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4,
        rightAnswer: this.rightAnswer,
      });
      this.dialogRef.close({
        question: this.question,
        answer1: this.answer1,
        answer2: this.answer2,
        answer3: this.answer3,
        answer4: this.answer4,
        rightAnswer: this.rightAnswer,
      });
      this.dialog.open(DialogConfirmComponentComponent);
    }
  }
}
