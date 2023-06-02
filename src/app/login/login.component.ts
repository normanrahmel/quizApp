import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'Gast' && this.password === '123') {
      this.router.navigate(['/quiz/:id']);
    } else {
      //this.router.navigate(['/quiz']);
      alert('Falscher Benutzername oder Passwort.');
    }
  }
}
