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

  async onAddPlayer(): Promise<void> {
    const gameId = localStorage.getItem('gameId'); // Get the gameId from localStorage
    if (gameId !== null) {
      await this.playerService.addPlayer(gameId, this.name);
      this.dialogRef.close();
      console.log('Player added "Dialog-add-Player.comp": ', this.name);
    } else {
      console.error('gameId not found in local storage.');
    }
  }
}
