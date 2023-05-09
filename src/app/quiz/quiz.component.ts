/*import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DbService } from '../db.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./style.css'],
})
export class QuizComponent implements OnInit {
  currentQuestion = 0;
  rightQuestions = 0;
  questions: any[];
  nextButtonDisabled = true;

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getQuestions();
    this.init();
  }

  getQuestions() {
    this.questions = this.dbService.getAllQuestions();
  }

  init() {
    document.getElementById('allQuestions').innerHTML =
      this.questions.length.toString();
    this.showQuestion();
  }

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
    document.getElementById('endScreen').style.display = '';
    document.getElementById('quizBody').style.display = 'none';
    document.getElementById('questionMarkPicture').style.display = 'none';
    document.getElementById('progressEndScreen').style.display = 'none';
    document.getElementById('amountOfQuestions').innerHTML =
      this.questions.length.toString();
    document.getElementById('amountOfRightQuestions').innerHTML =
      this.rightQuestions.toString();
  }

  showNextQuestion() {
    const question = this.questions[this.currentQuestion];
    document.getElementById('questionNumber').innerHTML = (
      this.currentQuestion + 1
    ).toString();
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];
  }

  updateProgressBar() {
    const percent = (this.currentQuestion + 1) / this.questions.length;
    const roundedPercent = Math.round(percent * 100);

    document.getElementById('progressBar').innerHTML = `${roundedPercent}%`;
    document.getElementById('progressBar').style.width = `${roundedPercent}%`;
  }

  answer(selection) {
    const question = this.questions[this.currentQuestion];
    const selectedQuestionNumber = selection.slice(-1);
    const idOfRightAnswer = `answer${question['rightAnswer']}`;
    this.nextButtonDisabled = false;

    if (this.rightAnswerSelected(selectedQuestionNumber, question)) {
      document
        .getElementById(selection)
        .parentElement.classList.add('bg-success');

      document
        .getElementById('containerAnswer')
        .classList.add('disabledbutton');
      this.rightQuestions++;
    } else {
      document
        .getElementById(selection)
        .parentElement.classList.add('bg-danger');
      document
        .getElementById(idOfRightAnswer)
        .parentElement.classList.add('bg-success');
      document
        .getElementById('containerAnswer')
        .classList.add('disabledbutton');
    }
    this.nextButtonDisabled = false;
    (document.getElementById('nextButton') as HTMLInputElement).disabled =
      false;
  }

  rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['rightAnswer'];
  }

  nextQuestion() {
    console.log('nextQuestion');
    this.nextButtonDisabled = true;
    this.currentQuestion++;
    this.showQuestion();
    (document.getElementById('nextButton') as HTMLInputElement).disabled = true;
    this.resetAnswers();
  }

  resetAnswers() {
    document
      .getElementById('answer1')
      .parentElement.classList.remove('bg-danger');
    document
      .getElementById('answer1')
      .parentElement.classList.remove('bg-success');
    document
      .getElementById('answer2')
      .parentElement.classList.remove('bg-danger');
    document
      .getElementById('answer2')
      .parentElement.classList.remove('bg-success');
    document
      .getElementById('answer3')
      .parentElement.classList.remove('bg-danger');
    document
      .getElementById('answer3')
      .parentElement.classList.remove('bg-success');
    document
      .getElementById('answer4')
      .parentElement.classList.remove('bg-danger');
    document
      .getElementById('answer4')
      .parentElement.classList.remove('bg-success');
    document
      .getElementById('containerAnswer')
      .classList.remove('disabledbutton');
  }

  restartGame() {
    window.location.reload();
  }
}
*/
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DbService } from '../db.service';

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

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  ngAfterViewInit(): void {
    this.init();
    this.showQuestion();
  }

  getQuestions() {
    this.questions = this.dbService.getAllQuestions();
  }

  init() {
    this.amountOfQuestions.nativeElement.innerHTML =
      this.questions.length.toString();
    this.showQuestion();
  }

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

  /* showNextQuestion() {
    const question = this.questions[this.currentQuestion];
    this.questionNumber.nativeElement.innerHTML = (
      this.currentQuestion + 1
    ).toString();
    this.questionText.nativeElement.innerHTML = question['question'];
    this.answer1.nativeElement.innerHTML = question['answer1'];
    this.answer2.nativeElement.innerHTML = question['answer2'];
    this.answer3.nativeElement.innerHTML = question['answer3'];
    this.answer4.nativeElement.innerHTML = question['answer4'];

  }*/
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
}
