import { Component } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  players = [];

  constructor(private playerService: PlayerService) {}
  ngOnInit() {
    this.players = this.playerService.getPlayers();
  }
}
