/*import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss'],
})
export class EndScreenComponent implements OnInit {
  players: Player[] = []; // Initialize players as an array of Player
  winner: Player; // The player with the highest score
  scores: { [name: string]: number } = {}; // stores the scores of each player
  constructor(
    private playerService: PlayerService,
    private dbService: DbService
  ) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe((players: Player[]) => {
      this.players = players;
      // Update the winner whenever the players data changes
      this.winner = this.playerService.getWinner();
      // Update the scores of each player
      this.scores = this.playerService.getScores();
    });
  }

  isWinner(player: Player) {
    return player === this.winner;
  }

  onAnswerSelected(questionIndex: number, givenAnswer: number) {
    const isCorrect = this.dbService.checkAnswer(questionIndex, givenAnswer);
    if (isCorrect) {
      const activePlayer = this.playerService.getActivePlayer();
      if (activePlayer) {
        this.playerService.increaseScore(activePlayer.name);
      }
    }
    console.log('isCorrect: ', isCorrect);
  }
}*/
import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss'],
})
export class EndScreenComponent implements OnInit {
  players: Player[] = []; // Initialize players as an array of Player
  winner: Player; // The player with the highest score

  constructor(
    private playerService: PlayerService,
    private dbService: DbService
  ) {}

  ngOnInit() {
    // this.playerService.getPlayers().subscribe((players: Player[]) => {
    // this.players = players;
    //});
  }

  isWinner(player: Player) {
    return player === this.winner;
  }

  onAnswerSelected(questionIndex: number, givenAnswer: number) {
    const isCorrect = this.dbService.checkAnswer(questionIndex, givenAnswer);
    if (isCorrect) {
      const activePlayer = this.playerService.getActivePlayer();
      if (activePlayer) {
        this.playerService.increaseScore(activePlayer.name);
      }
    }
    console.log('isCorrect: ', isCorrect);
  }
}
