import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}
  currentQuestion = 0;

  rightQuestions = 0;

  audioSuccess = new Audio('assets/Audio/success.mp3');

  audioWrong = new Audio('assets/Audio/wrong.mp3');

  questions = [
    {
      question: 'Wer hat HTML erfunden',
      answer1: 'Ralf Alons',
      answer2: 'Linus Torvalds',
      answer3: 'Tim Berners-Lee',
      answer4: 'Franz Alt',
      rightAnswer: 3,
    },
    {
      question:
        'Wie alt war der jüngste Teilnehmer, der bei einer Fußball-WM Weltmeister wurde?',
      answer1: '18',
      answer2: '19',
      answer3: '17',
      answer4: '16',
      rightAnswer: 3,
    },

    {
      question: 'Wie viele Runden gibt es im Profiboxen höchstens?',
      answer1: '10',
      answer2: '13',
      answer3: '14',
      answer4: '12',
      rightAnswer: 4,
    },
    {
      question:
        'Wie nennt man die dritthöchste Liga im deutschen Profifußball?',
      answer1: 'Regionalliga',
      answer2: 'Verbandsliga',
      answer3: '3. Liga',
      answer4: 'Landesliga',
      rightAnswer: 3,
    },
    {
      question: 'Was bedeutet die Abkürzung DHB?',
      answer1: 'Deutscher Handballbund',
      answer2: 'Deutscher Hochsprungbund',
      answer3: 'Deutscher Schwersport',
      answer4: 'Deutscher Hockeybund',
      rightAnswer: 1,
    },
    {
      question:
        ' Welche Nation gewann bei den Olympischen Spielen 2012 in London die meisten Goldmedaillen?',
      answer1: 'Deutschland',
      answer2: 'USA',
      answer3: 'Russland',
      answer4: 'China',
      rightAnswer: 2,
    },
    {
      question: 'Wofür steht die Abkürzung UEFA?',
      answer1: 'United European Football Alliance',
      answer2: 'Union of European Football Associations',
      answer3: 'United European Football Associations',
      answer4: 'Union of European Football Alliance',
      rightAnswer: 2,
    },
    {
      question: 'Wer entwickelte die Rechenmaschine Analytical Engine',
      answer1: 'Charles Babbage',
      answer2: 'Konrad Zuse',
      answer3: 'Jörg Pilaver',
      answer4: 'Mario Gemoz',
      rightAnswer: 1,
    },
    {
      question: 'wie heißt die programmiersprache des internets',
      answer1: 'C#',
      answer2: 'C++',
      answer3: 'Java',
      answer4: 'JavaScript',
      rightAnswer: 4,
    },
  ];

  getAllQuestions() {
    return this.questions;
  }

  // Create: Füge eine neue Frage hinzu
  createQuestion(question: any) {
    this.questions.push(question);
  }

  // Read: Frage nach Index abrufen
  getQuestion(index: number) {
    return this.questions[index];
  }

  // Update: Frage an einem bestimmten Index aktualisieren
  updateQuestion(index: number, updatedQuestion: any) {
    this.questions[index] = updatedQuestion;
  }

  // Delete: Frage an einem bestimmten Index entfernen
  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  // Anzahl der Fragen abrufen
  getQuestionCount() {
    return this.questions.length;
  }
}
