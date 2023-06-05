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
import { set } from 'firebase/database';
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

  async createNewGame() {
    const newGame = {
      // Initialisieren Sie hier alle notwendigen Felder
      currentQuestion: 0,
      rightQuestions: 0,
      questions: [],
      players: this.players,
    };

    const gamesCollection = collection(this.firestore, 'games');
    const docRef = await addDoc(gamesCollection, newGame);
    console.log('New game created with ID: ', docRef.id);
    localStorage.setItem('gameId', docRef.id);

    return docRef.id; // Sie können die Spiel-ID zurückgeben, damit sie in der Anwendung gespeichert oder verwendet werden kann
  }

  async loadPlayers(gameId: string) {
    const gameDoc = doc(this.firestore, `games/${gameId}`);
    const gameSnapshot = await getDoc(gameDoc);

    if (gameSnapshot.exists()) {
      const gameData = gameSnapshot.data();
      const playersCollection = collection(this.firestore, 'players');
      const playerDocs = await Promise.all(
        gameData['players'].map((id) => getDoc(doc(playersCollection, id)))
      );
      this.players = playerDocs.map((doc) => doc.data());
      this.playersSubject.next(this.players);
    }
  }

  async addPlayer(gameId: string, name: string) {
    console.trace('addPlayer was called');

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

    // Add new player to the local list
    this.players.push(newPlayer);

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

    // Only update the subject after all the async operations
    this.playersSubject.next(this.players);
  }

  async updateGameState(gameId: string, gameState: any) {
    const gameDoc = doc(this.firestore, `games/${gameId}`);
    await updateDoc(gameDoc, gameState);
  }

  async getGame(gameId: string) {
    const gameDoc = doc(this.firestore, `games/${gameId}`);
    const gameSnapshot = await getDoc(gameDoc);
    return gameSnapshot.data();
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

  increaseScore(playerName: string) {
    this.scores[playerName]++;
  }

  getActivePlayer(): Player {
    return this.players.find((player) => player.active);
  }
}
