/*
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private players = [];
  private playersSubject = new BehaviorSubject(this.players);

  addPlayer(name: string) {
    const newPlayer = { name: name, image: '1.webp', active: true };
    this.players.push(newPlayer);
    this.playersSubject.next(this.players);
    console.log('Player added in service: ', newPlayer);
  }

  getPlayers() {
    return this.playersSubject.asObservable();
  }
}
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Player {
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
}
