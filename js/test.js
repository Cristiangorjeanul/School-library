document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: ' + quiz.score + ' points</h1>';
			if (grade >= 0.8) {
				results += '<h2>Congratulations!<br>You have good knowledge<br>about Frontend Development!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2>You need to read<br>more information<br>about Frontend Development!</h2>';
			} else {
				results += '<h2>You have not read<br>much information<br>about Frontend Development!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('Lorem ipsum dolor sit amet, consectetur adipisicing elit?', ['One', 'Two', 'Three', 'Four'], 'One'),
		new FormatQuestion('Sed ut perspiciatis, omnis is natus error sit voluptatem?', ['Four', 'Three', 'Two', 'One'], 'Four'),
		new FormatQuestion('Lorem ipsum dolor sit amet, consectetur adipisicing elit?', ['One', 'Two', 'Three', 'Four'], 'One'),
		new FormatQuestion('Sed ut perspiciatis, omnis is natus error sit voluptatem?', ['Four', 'Three', 'Two', 'One'], 'Four'),
		new FormatQuestion('Lorem ipsum dolor sit amet, consectetur adipisicing elit?', ['One', 'Two', 'Three', 'Four'], 'One'),
		new FormatQuestion('Sed ut perspiciatis, omnis is natus error sit voluptatem?', ['Four', 'Three', 'Two', 'One'], 'Four'),
		new FormatQuestion('Lorem ipsum dolor sit amet, consectetur adipisicing elit?', ['One', 'Two', 'Three', 'Four'], 'One'),
		new FormatQuestion('Sed ut perspiciatis, omnis is natus error sit voluptatem?', ['Four', 'Three', 'Two', 'One'], 'Four'),
		new FormatQuestion('Lorem ipsum dolor sit amet, consectetur adipisicing elit?', ['One', 'Two', 'Three', 'Four'], 'One'),
		new FormatQuestion('Sed ut perspiciatis, omnis is natus error sit voluptatem?', ['Four', 'Three', 'Two', 'One'], 'Four')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});