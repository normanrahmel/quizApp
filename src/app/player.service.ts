import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  doc,
} from '@angular/fire/firestore';
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
  scores: { [name: string]: number } = {};

  constructor(private firestore: Firestore) {}

  /*async addPlayer(name: string) {
    // Änderung der Methode zu asynchron
    if (this.players.length >= 2) {
      alert('In der aktuellen Version sind nur 2-Spieler möglich.');
      return;
    }
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

    // Hinzufügen der Spielerdaten in Firestore
    const playersCollection = collection(this.firestore, 'players');
    await addDoc(playersCollection, newPlayer);

    console.log('Player added in service: ', newPlayer);
  }*/
  async createNewGame() {
    const newGame = {
      // Initialisieren Sie hier alle notwendigen Felder
    };

    const gamesCollection = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesCollection, newGame);
    console.log('New game created with ID: ', docRef.id);
    localStorage.setItem('gameId', docRef.id);

    return docRef.id; // Sie können die Spiel-ID zurückgeben, damit sie in der Anwendung gespeichert oder verwendet werden kann
  }
  /*
  async addPlayer(gameId: string, name: string) {
    // Erstellen Sie den neuen Spieler und fügen Sie ihn zur 'players'-Sammlung hinzu, wie Sie es bereits tun
    const newPlayer: Player = {
      name: name,
      image: '1.webp',
      active: true,
      score: 0,
    };

    const playersCollection = collection(this.firestore, 'players');
    const docRef = await addDoc(playersCollection, newPlayer);
    console.log('Player added with ID: ', docRef.id);

    // Dann fügen Sie den neuen Spieler zum Spiel hinzu
    const gameDoc = doc(this.firestore, `games/${gameId}`);
    const gameSnapshot = await getDoc(gameDoc);
    if (gameSnapshot.exists()) {
      const gameData = gameSnapshot.data();
      if (gameData['players']) {
        gameData['players'].push(docRef.id); // Oder fügen Sie das gesamte Spielerobjekt hinzu, wenn Sie möchten
      } else {
        gameData['players'] = [docRef.id];
      }
      await updateDoc(gameDoc, gameData);
      console.log('Player added to game');
    }
  }*/
  async addPlayer(gameId: string, name: string) {
    // Deactivate all players before adding a new one
    this.players.forEach((player) => (player.active = false));

    const newPlayer: Player = {
      name: name,
      image: '1.webp',
      active: true,
      score: 0,
    };

    const playersCollection = collection(this.firestore, 'players');
    const docRef = await addDoc(playersCollection, newPlayer);
    console.log('Player added with ID: ', docRef.id);

    // Add new player to the local list and update the subject
    this.players.push(newPlayer);
    this.playersSubject.next(this.players);

    const gameDoc = doc(this.firestore, `games/${gameId}`);
    const gameSnapshot = await getDoc(gameDoc);
    if (gameSnapshot.exists()) {
      const gameData = gameSnapshot.data();
      if (gameData['players']) {
        gameData['players'].push(docRef.id);
      } else {
        gameData['players'] = [docRef.id];
      }
      await updateDoc(gameDoc, gameData);
      console.log('Player added to game');
    }
  }

  getScores() {
    return this.scores;
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
    this.scores[playerName]++;
  }

  getActivePlayer(): Player {
    return this.players.find((player) => player.active);
  }
}
