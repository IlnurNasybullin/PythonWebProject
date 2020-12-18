class TestQuestion {
	constructor(question, answers, ID_right_answer) {
		this.question = question;
		this.answers = answers;
		this.right_answer = answers[ID_right_answer];
	}
	
	getQuestion() {
		return this.question;
	}
	
	getAnswers() {
		return this.answers;
	}
	
	is_right_answer(answer) {
		return this.right_answer == answer;
	}
}

var test_questions = []

tests_from_db.forEach(function(item, i, arr) {
  test_questions[i] = new TestQuestion(item.question, item.answers, item.right_answer)
});

let index = 0;
let right_answers = 0;
let questions_count = test_questions.length;
const max = questions_count > 15 ? 15 : questions_count;

let radio_buttons_map = new Map()
radio_buttons_map.set("answer_1", "label_1");
radio_buttons_map.set("answer_2", "label_2");
radio_buttons_map.set("answer_3", "label_3");
radio_buttons_map.set("answer_4", "label_4");

function getSelectedAnswer() {
	let radio_button;

	for (entry of radio_buttons_map) {
		radio_button = document.getElementById(entry[0])
		if (radio_button.type == "radio" && radio_button.checked) {
			selectedAnswer = document.getElementById(entry[1]).innerHTML;
			return selectedAnswer;
		}
	}

	return null;
}

function is_right_answer() {
	let selectedAnswer = getSelectedAnswer();
	return test_questions[index].is_right_answer(selectedAnswer);
}	

function check_answer() {
	if (is_right_answer()) {
		right_answers = right_answers + 1;
	}
}

function nextTestQuestion() {
	check_answer();

	if (index == (max - 1)) {
		finishTest()
		return;
	}
	index = index + 1;

	repaintElements()
}

function repaintElements() {
	let testQuestion = test_questions[index];
	let question = testQuestion.getQuestion();
	let answers = testQuestion.getAnswers();

	console.log(question)
	question = question.replaceAll("&lt;br&gt;", "<br>")
	.replaceAll("&lt;sub&gt;", "<sub>")
	.replaceAll("&lt;sup&gt;", "<sup>")
	.replaceAll("&lt;/sup&gt;", "</sup>")
	.replaceAll("&lt;/sub&gt;", "</sub>")

	document.getElementById("question").innerHTML = `${index + 1}. ${question}`;
	let i = 0;
	for (let label of radio_buttons_map.values()) {
		document.getElementById(label).innerText = answers[i];
		i++;
	}

	if (index == (max-1)) {
		document.getElementById("finish").style.backgroundColor = "#27a444";
		document.getElementById("next").onclick = finishTest;
	}

	setDefaultRadioButtons();
}

function setDefaultRadioButtons() {
	let testAnswer = document.getElementsByName('testAnswer');
    for (let i = 0; i < testAnswer.length; i++) {
        if (testAnswer[i].type == "radio") {
			testAnswer[i].checked = false;
        }
    }
}

function finishTest() {
	check_answer()
	let percent = parseInt(right_answers) / parseInt(max) * 100;
	document.location.href = finish_url+'?'+percent.toFixed(2);
}

window.onload = repaintElements();