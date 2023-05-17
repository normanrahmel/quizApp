import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss'],
})
export class DialogShareComponent {
  getURL() {
    navigator.clipboard.writeText(window.location.href);
    document.getElementById('message').classList.remove('d-none');
    setTimeout(() => {
      document.getElementById('message').classList.add('d-none');
    }, 2000);
  }
}
