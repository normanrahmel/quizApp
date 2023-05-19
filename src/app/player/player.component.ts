import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from '../player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnDestroy {
  players = [];
  playersSubscription: Subscription;

  constructor(private playerService: PlayerService) {
    this.playersSubscription = this.playerService
      .getPlayers()
      .subscribe((players) => {
        this.players = players;
        console.log('Players Player.comp: ', this.players);
      });
  }

  ngOnDestroy() {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
  }
}
