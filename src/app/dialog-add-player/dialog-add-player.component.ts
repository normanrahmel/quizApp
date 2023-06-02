/*import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
})
export class DialogAddPlayerComponent {
  name: string = '';
  count = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    private playerService: PlayerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(): void {
    if (this.count == 1) {
      alert('Maximal 3 Spieler erlaubt.');
    } else {
      this.count++;
      this.playerService.addPlayer(gameId, this.name);
      this.dialogRef.close();
      console.log('Player added "Dialog-add-Player.comp": ', this.name);
    }
  }

  async onAddPlayer() {
    const gameId = localStorage.getItem('gameId'); // Get the gameId from localStorage
    await this.addPlayer(gameId, this.name);
  }
}*/
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

  async addPlayer(): Promise<void> {
    const gameId = localStorage.getItem('gameId'); // Get the gameId from localStorage
    await this.playerService.addPlayer(gameId, this.name);
    this.dialogRef.close();
    console.log('Player added "Dialog-add-Player.comp": ', this.name);
  }
}
