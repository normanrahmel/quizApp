import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  name: string;
  image: string;
  active: boolean;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private players: Player[] = [];
  private playersSubject = new BehaviorSubject<Player[]>(this.players);

  addPlayer(name: string) {
    // Deactivate all players before adding a new one
    this.players.forEach((player) => (player.active = false));

    const newPlayer: Player = {
      name: name,
      image: '1.webp',
      active: true,
      score: 0,
    };

    this.players.push(newPlayer);
    this.playersSubject.next(this.players);

    console.log('Player added in service: ', newPlayer);
  }

  getPlayers() {
    return this.playersSubject.asObservable();
  }

  addScore(playerName: string, score: number) {
    const player = this.players.find((player) => player.name === playerName);
    if (player) {
      player.score += score;
      this.playersSubject.next(this.players);
    }
  }

  setActivePlayer(playerName: string) {
    this.players.forEach(
      (player) => (player.active = player.name === playerName)
    );
    this.playersSubject.next(this.players);
  }

  switchActivePlayer() {
    const activePlayerIndex = this.players.findIndex((player) => player.active);
    if (activePlayerIndex !== -1) {
      // Deactivate the current active player
      this.players[activePlayerIndex].active = false;

      // Activate the next player
      const nextPlayerIndex = (activePlayerIndex + 1) % this.players.length;
      this.players[nextPlayerIndex].active = true;

      // Emit the new players state
      this.playersSubject.next(this.players);
    }
  }

  getWinner(): Player {
    // Assuming that the player with the highest score wins
    // If there are multiple players with the same highest score, the first one is returned
    return this.players.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );
  }

  increaseScore(playerName: string) {
    const player = this.players.find((player) => player.name === playerName);
    if (player) {
      player.score++;
      this.playersSubject.next(this.players);
      console.log('Player score increased: ', player.score);
    }
  }

  getActivePlayer(): Player {
    return this.players.find((player) => player.active);
  }
}
