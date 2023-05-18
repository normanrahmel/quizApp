import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { EndScreenComponent } from './end-screen/end-screen.component';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { DialogShareComponent } from './dialog-share/dialog-share.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddQuestionComponent } from './dialog-add-question/dialog-add-question.component';
import { DialogConfirmComponentComponent } from './dialog-confirm-component/dialog-confirm-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizComponent,
    EndScreenComponent,
    DialogAddPlayerComponent,
    DialogShareComponent,
    DialogAddQuestionComponent,
    DialogConfirmComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
