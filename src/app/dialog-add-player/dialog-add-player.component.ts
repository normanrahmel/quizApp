import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    private playerService: PlayerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addPlayer(): void {
    this.playerService.addPlayer(this.name);
    this.dialogRef.close();
    console.log('Player added "Dialog-add-Player.comp": ', this.name);
  }
}
