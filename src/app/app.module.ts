/*import { NgModule } from '@angular/core';
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
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddQuestionComponent } from './dialog-add-question/dialog-add-question.component';
import { DialogConfirmComponentComponent } from './dialog-confirm-component/dialog-confirm-component.component';
import { PlayerComponent } from './player/player.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBSgOWvxcggevda3VUTqoF34WJPAYdJwpE',
  authDomain: 'quiz-app-52acb.firebaseapp.com',
  projectId: 'quiz-app-52acb',
  storageBucket: 'quiz-app-52acb.appspot.com',
  messagingSenderId: '160916848855',
  appId: '1:160916848855:web:09ec2437cd475b3ec67092',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
    PlayerComponent,
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
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
*/ import { NgModule } from '@angular/core';
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
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddQuestionComponent } from './dialog-add-question/dialog-add-question.component';
import { DialogConfirmComponentComponent } from './dialog-confirm-component/dialog-confirm-component.component';
import { PlayerComponent } from './player/player.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

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
    PlayerComponent,
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
