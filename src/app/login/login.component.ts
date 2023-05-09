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
    if (this.username === 'Gast' && this.password === 'Test123') {
      this.router.navigate(['/quiz']);
    } else {
      alert('Falscher Benutzername oder Passwort.');
    }
  }
}
