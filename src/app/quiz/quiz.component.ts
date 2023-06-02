import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DbService } from '../db.service';
import { PlayerService } from '../player.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { DialogAddPlayerComponent } from './dialog-add-player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogShareComponent } from '../dialog-share/dialog-share.component';
import { DialogAddQuestionComponent } from '../dialog-add-question/dialog-add-question.component';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  addDoc,
} from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./style.css'],
})
export class QuizComponent implements OnInit, AfterViewInit {
  currentQuestion = 0;
  rightQuestions = 0;
  questions: any[];
  nextButtonDisabled = true;
  name: string = '';
  @ViewChild('endScreen') endScreen: ElementRef;
  @ViewChild('quizBody') quizBody: ElementRef;
  @ViewChild('questionMarkPicture') questionMarkPicture: ElementRef;
  @ViewChild('progressEndScreen') progressEndScreen: ElementRef;
  @ViewChild('amountOfQuestions') amountOfQuestions: ElementRef;
  @ViewChild('amountOfRightQuestions') amountOfRightQuestions: ElementRef;
  @ViewChild('questionNumber') questionNumber: ElementRef;
  @ViewChild('questionText') questionText: ElementRef;
  @ViewChild('answer1') answer1: ElementRef;
  @ViewChild('answer2') answer2: ElementRef;
  @ViewChild('answer3') answer3: ElementRef;
  @ViewChild('answer4') answer4: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;

  constructor(
    private dbService: DbService,
    private dialog: MatDialog,
    private firestore: Firestore,
    private playerService: PlayerService,
    private router: Router
  ) {}

  /**
   * Wird aufgerufen, wenn die Komponente initialisiert wird.
   * Ruft die Methode getQuestions auf, um die Fragen zu holen.
   * Es erstellt eine Verbindung zur Firestore-Sammlung 'games' und
   * ruft die Daten des ersten Spiels in der Sammlung ab.
   */
  async ngOnInit() {
    // Ruft die Fragen aus dem DbService ab
    this.getQuestions();
    //this.playerService.createNewGame();

    // Erstellt eine Verbindung zur Firestore-Sammlung 'games'

    //const gamesCollection = collection(this.firestore, 'games');
    //const game = await firstValueFrom(collectionData(gamesCollection));
    //console.log('Test', game);

    // Erstellt ein neues Dokument in der Sammlung 'games'
    /*const gameDoc = doc(this.firestore, 'games/game1');
    await setDoc(gameDoc, {
      title: 'Spiel 1',
      score: 0,
      active: true,
    });*/
  }
  async createAndLoadNewGame() {
    const newGameId = await this.playerService.createNewGame();
    this.router.navigate(['/quiz', newGameId]);
  }

  /**
   * Wird aufgerufen, nachdem die Ansicht der Komponente initialisiert wurde.
   * Initialisiert das Spiel und zeigt die erste Frage an.
   */
  ngAfterViewInit(): void {
    this.init();
    this.showQuestion();
  }

  /**
   * Ruft alle Fragen aus dem DbService ab und speichert diese in der Komponente.
   */
  getQuestions() {
    this.questions = this.dbService.getAllQuestions();
  }

  /**
   * Initialisiert das Spiel, indem es die Anzahl der Fragen im HTML festlegt
   * und die erste Frage anzeigt.
   */
  init() {
    this.amountOfQuestions.nativeElement.innerHTML =
      this.questions.length.toString();
    this.showQuestion();
  }

  /**
   * Zeigt die aktuelle Frage an.
   * Überprüft zuerst, ob das Spiel vorbei ist.
   * Wenn das Spiel vorbei ist, wird der Endbildschirm angezeigt,
   * ansonsten wird der Fortschrittsbalken aktualisiert und die nächste Frage angezeigt.
   */
  showQuestion() {
    if (this.gameIsOver()) {
      this.showEndScreen();
    } else {
      this.updateProgressBar();
      this.showNextQuestion();
    }
  }

  gameIsOver() {
    return this.currentQuestion >= this.questions.length;
  }

  showEndScreen() {
    this.endScreen.nativeElement.style.display = '';
    this.quizBody.nativeElement.style.display = 'none';
    this.questionMarkPicture.nativeElement.style.display = 'none';
    this.progressEndScreen.nativeElement.style.display = 'none';
    this.amountOfQuestions.nativeElement.innerHTML =
      this.questions.length.toString();
    this.amountOfRightQuestions.nativeElement.innerHTML =
      this.rightQuestions.toString();
  }

  showNextQuestion() {
    const question = this.questions[this.currentQuestion];

    if (this.questionNumber && this.questionNumber.nativeElement) {
      this.questionNumber.nativeElement.innerHTML = (
        this.currentQuestion + 1
      ).toString();
    }

    if (this.questionText && this.questionText.nativeElement) {
      this.questionText.nativeElement.innerHTML = question['question'];
    }

    for (let i = 1; i <= 4; i++) {
      if (this['answer' + i] && this['answer' + i].nativeElement) {
        this['answer' + i].nativeElement.innerHTML = question['answer' + i];
      }
    }
  }

  updateProgressBar() {
    const percent = (this.currentQuestion + 1) / this.questions.length;
    const roundedPercent = Math.round(percent * 100);

    this.progressBar.nativeElement.innerHTML = `${roundedPercent}%`;
    this.progressBar.nativeElement.style.width = `${roundedPercent}%`;
  }

  answer(selection) {
    const question = this.questions[this.currentQuestion];
    const selectedQuestionNumber = selection.slice(-1);
    const idOfRightAnswer = `answer${question['rightAnswer']}`;
    this.nextButtonDisabled = false;

    if (this.rightAnswerSelected(selectedQuestionNumber, question)) {
      this[
        'answer' + selectedQuestionNumber
      ].nativeElement.parentElement.classList.add('bg-success');
      this.rightQuestions++;
    } else {
      this[
        'answer' + selectedQuestionNumber
      ].nativeElement.parentElement.classList.add('bg-danger');
      this[
        'answer' + question['rightAnswer']
      ].nativeElement.parentElement.classList.add('bg-success');
    }
    this.nextButtonDisabled = false;
    this.nextButton.nativeElement.disabled = false;
    setTimeout(() => {
      this.dbService.nextQuestion();
      this.dbService.checkAnswer(
        question['rightAnswer'],
        selectedQuestionNumber
      );
    }, 1000);
  }

  rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['rightAnswer'];
  }

  nextQuestion() {
    console.log('nextQuestion');
    this.nextButtonDisabled = true;
    this.currentQuestion++;
    this.showQuestion();
    this.nextButton.nativeElement.disabled = true;
    this.resetAnswers();
  }

  resetAnswers() {
    for (let i = 1; i <= 4; i++) {
      this['answer' + i].nativeElement.parentElement.classList.remove(
        'bg-danger'
      );
      this['answer' + i].nativeElement.parentElement.classList.remove(
        'bg-success'
      );
    }
  }

  restartGame() {
    window.location.reload();
  }

  openAddQuestionDialog(): void {
    this.dialog.open(DialogAddQuestionComponent, {
      width: '1000px',
      height: '700px',
    });
  }

  openAddPlayerDialog(): void {
    this.dialog.open(DialogAddPlayerComponent, {
      width: '400px',
      height: '300px',
    });
  }

  openShareDialog(): void {
    this.dialog.open(DialogShareComponent, {
      width: '450px',
      height: '220px',
    });
  }
}
