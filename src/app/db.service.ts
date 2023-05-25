import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private playerService: PlayerService) {}
  currentQuestion = 0;

  rightQuestions = 0;

  audioSuccess = new Audio('assets/Audio/success.mp3');

  audioWrong = new Audio('assets/Audio/wrong.mp3');

  questions = [
    {
      question: 'Was ist "Ransomware"?',
      answer1: 'Eine Art von Antivirus-Software',
      answer2: 'Eine Hardware-Komponente zur Datenverschlüsselung',
      answer3: 'Eine Technologie zur Datenwiederherstellung',
      answer4:
        'Eine Art von Malware, die Daten auf einem System verschlüsselt und Lösegeld für die Entschlüsselung verlangt',
      rightAnswer: 4,
    },
    {
      question: 'Was ist "Phishing"?',
      answer1: 'Ein Angriff auf Netzwerk-Infrastrukturen',
      answer2: 'Eine Technik zur sicheren Datenübertragung',
      answer3: 'Eine Methode zur Entfernung von Schadsoftware',
      answer4:
        'Eine Art von Betrug, bei dem ein Angreifer versucht, vertrauliche Informationen wie Benutzernamen, Passwörter und Kreditkartennummern zu erhalten',
      rightAnswer: 4,
    },
    {
      question: 'Was ist "SSL"?',
      answer1: 'Ein Netzwerkprotokoll zur Authentifizierung von Benutzern',
      answer2: 'Ein Verschlüsselungsschema für Passwörter',
      answer3: 'Eine Methode zur Malware-Bekämpfung',
      answer4: 'Ein Protokoll zur sicheren Datenübertragung im Internet',
      rightAnswer: 4,
    },
    {
      question: 'Was ist ein "Passwortgenerator"?',
      answer1: 'Ein Programm, das Schwachstellen in einem Netzwerk aufdeckt',
      answer2: 'Ein Programm, das automatisch Passwörter generiert',
      answer3: 'Ein Programm, das Viren scannt',
      answer4: 'Ein Programm, das die Geschwindigkeit des Internets misst',
      rightAnswer: 2,
    },
    {
      question: 'Was ist eine "Phishing-Attacke"?',
      answer1: 'Ein Angriff auf das Stromnetz',
      answer2: 'Ein Angriff auf ein Schiff im Hafen',
      answer3:
        'Ein Angriff auf das Bankkonto durch gefälschte E-Mails oder Websites',
      answer4:
        'Ein Angriff auf ein soziales Netzwerk durch automatisierte Posts',
      rightAnswer: 3,
    },
    {
      question: 'Was ist ein "Firewall"?',
      answer1: 'Eine Schutzmauer um ein Gebäude',
      answer2: 'Ein Programm, das den Bildschirm schwarz macht',
      answer3:
        'Eine Vorrichtung, die den Verkehr zwischen einem internen und einem externen Netzwerk reguliert',
      answer4: 'Eine Vorrichtung, die die Temperatur des Computers reguliert',
      rightAnswer: 3,
    },
    {
      question: 'Was ist "Zwei-Faktor-Authentifizierung"?',
      answer1:
        'Ein Sicherheitsprotokoll, das nur zwei Computer miteinander kommunizieren lässt',
      answer2:
        'Eine Methode, bei der nur Benutzer mit einer bestimmten E-Mail-Adresse Zugriff auf ein System haben',
      answer3:
        'Eine Methode, bei der der Benutzer seinen Benutzernamen und sein Passwort sowie eine zusätzliche Bestätigung, wie einen Fingerabdruck, eingeben muss',
      answer4:
        'Eine Methode, bei der der Benutzer nur sein Passwort eingeben muss, um sich anzumelden',
      rightAnswer: 3,
    },
    {
      question:
        'Was ist eine beliebte Methode für Cyberkriminelle, um an Passwörter zu gelangen?',
      answer1: 'Social Engineering',
      answer2: 'Brute-Force-Attacken',
      answer3: 'Phishing-Websites',
      answer4: 'Passwort-Raten',
      rightAnswer: 1,
    },
    {
      question:
        'Welche der folgenden Aussagen ist falsch in Bezug auf die Zwei-Faktor-Authentifizierung (2FA)?',
      answer1: '2FA erhöht die Sicherheit von Konten',
      answer2:
        '2FA verlangt von Benutzern, ein zusätzliches Passwort einzugeben',
      answer3:
        '2FA kann durch das Senden eines Bestätigungscodes auf das Telefon des Benutzers erfolgen',
      answer4:
        '2FA kann durch einfaches Eingeben eines Benutzernamens und Passworts umgangen werden',
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

  // Anzahl  der Fragen abrufen
  getQuestionCount() {
    return this.questions.length;
  }

  nextQuestion() {
    this.playerService.switchActivePlayer();
  }

  checkAnswer(questionIndex: number, givenAnswer: number): boolean {
    const question = this.questions[questionIndex];
    const isCorrect = question.rightAnswer === givenAnswer;
    console.log(
      'Checking answer for question',
      questionIndex,
      'given answer:',
      givenAnswer,
      'correct answer:',
      question.rightAnswer,
      'is correct:',
      isCorrect
    );

    if (isCorrect) {
      // Find the active player and increase their score
      const activePlayer = this.playerService.getActivePlayer();
      if (activePlayer) {
        this.playerService.increaseScore(activePlayer.name);
        console.log('Increased score for player', activePlayer.name);
      }
    }

    return isCorrect;
  }
}
