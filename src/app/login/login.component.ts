import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private playerService: PlayerService) {}

  onSubmit() {
    if (this.username === 'Gast' && this.password === '123') {
      this.router.navigate(['/quiz/:id']);
    } else {
      //this.router.navigate(['/quiz']);
      alert('Falscher Benutzername oder Passwort.');
    }
  }

  async createAndLoadNewGame() {
    const newGameId = await this.playerService.createNewGame();
    this.router.navigate(['/quiz', newGameId]);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
