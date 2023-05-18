import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}
  private players = [];

  addPlayer(name: string) {
    // Here you can add code to generate a random image for the player or set a default one
    const newPlayer = { name: name, image: 'default.jpg', active: false };
    this.players.push(newPlayer);
  }

  getPlayers() {
    return this.players;
  }
}
