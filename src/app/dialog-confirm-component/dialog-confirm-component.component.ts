import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-component',
  templateUrl: './dialog-confirm-component.component.html',
  styleUrls: ['./dialog-confirm-component.component.scss'],
})
export class DialogConfirmComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponentComponent>
  ) {}
}
