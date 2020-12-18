//класс, осуществляющий хранение пары "институт" : "множество дополнительных предметов для поступления"
//и обработку данных (получение имени института и результата ответа на запрос о принадлежности предмета
//во множество дополнительных предметов)
class Institute {
    constructor(name, subjects) {
        this.name = name;
        this.subjects = subjects;
    }

    getName() {
        return this.name;
    }

    hasSubject(subject) {
        return this.subjects.indexOf(subject) != -1;
    }
}

//Массив доступных дополнительных предметов
const subjects = ["Обществознание", "Физика", "История", "Информатика", "Биология", "Химия", "География", "Литература",
    "Иностранный язык"];

const universities_names = ["КФУ", "КНИТУ-КАИ", "КГМУ"];
//Поле для вывода ответа на запрос о количестве баллов
const score_result_label = document.getElementById("score_result");
const institute_label = document.getElementById("instituts")
//Массив экземпляров класса Institute
const kfu_instituts = [
    new Institute("Институт геологии и нефтегазовых технологий КФУ", ["Физика"]),
    new Institute("Институт фундаментальной медицины и биологии КФУ", ["Обществознание", "Физика",
        "Биология", "Химия", "Иностранный язык"]),
    new Institute("Институт экологии и природопользования КФУ", ["Физика", "Биология", "География"]),
    new Institute("Химический институт им. А.М.Бутлерова КФУ", ["Обществознание", "Химия"]),
    new Institute("Юридический факультет КФУ", ["Обществознание", "История"]),
    new Institute("Институт международных отношений, истории и востоковедения КФУ", ["Обществознание",
        "История", "Информатика", "Иностранный язык"]),
    new Institute("Институт филологии и межкультурной коммуникации им. Льва Толстого КФУ",
        ["Обществознание", "История", "Литература", "Иностранный язык"]),
    new Institute("Институт психологии и образования КФУ", ["Обществознание", "Биология"]),
    new Institute("Институт социально-философских наук и массовых коммуникаций КФУ", ["Обществознание",
        "История", "Литература", "Иностранный язык"]),
    new Institute("Институт управления, экономики и финансов КФУ", ["Обществознание", "История", "Химия",
        "География"]),
    new Institute("Инженерный институт КФУ", ["Физика"]),
    new Institute("Институт вычислительной математики и информационных технологий КФУ", ["Физика",
        "Обществознание", "Информатика"]),
    new Institute("Институт математики и механики им.Н.И.Лобачевского КФУ", ["Физика", "Обществознание",
        "Информатика"]),
    new Institute("Институт физики КФУ", ["Физика", "Обществознание"])
]

const knitu_kai_instituts = [
    new Institute("Институт авиации, наземного транспорта и энергетики", ["Физика"]),
    new Institute("Физико-математический факультет", ["Физика"]),
    new Institute("Институт автоматики и электронного приборостроения", ["Физика"]),
    new Institute("Институт компьютерных технологий и защиты информации", ["Физика", "Информатика"]),
    new Institute("Институт радиоэлектроники и телекоммуникаций", ["Физика", "Информатика"]),
    new Institute("Институт инженерной экономики и предпринимательства", ["Информатика",
        "Обществознание"])
]

const kgmu_instituts = [
    new Institute("Лечебный факультет КГМУ", ["Биология", "Химия"]),
    new Institute("Медико-профилактический факультет КГМУ", ["Биология", "Химия"]),
    new Institute("Педиатрический факультет КГМУ", ["Биология", "Химия"]),
    new Institute("Стоматологический факультет КГМУ", ["Биология", "Химия"]),
    new Institute("Факультет социальной работы и высшего сестринского образования КГМУ", ["Биология",
        "Химия", "История", "Обществознание"]),
    new Institute("Фармацевтический факультет КГМУ", ["Биология", "Химия", "Физика"])
]

var universities = new Map();
universities.set(universities_names[0], kfu_instituts);
universities.set(universities_names[1], knitu_kai_instituts);
universities.set(universities_names[2], kgmu_instituts);

const local_storage_key = 'abiturient_requests';

var full_name;

var selected_subject;

var math_score = {};
var russian_score = {};
var additional_subject_score = {};
var passing_score = {};

math_score.label_name = document.getElementById("maths_label").innerHTML;
russian_score.label_name = document.getElementById("russian_label").innerHTML;
additional_subject_score.label_name = document.getElementById("selected_subject_label").innerHTML;
passing_score.label_name = document.getElementById("passing_score_label").innerHTML;

var scores = [math_score, russian_score, additional_subject_score, passing_score];
var selected_university;

var score_result;
var institute_names_array;

var query_items = localStorage.getItem(local_storage_key);
query_items = query_items ? JSON.parse(query_items) : [];

function getInstituts() {
    let instituts = universities.get(selected_university);
    let instituts_names = "";
    let institute;
    let institute_name;

    for (let i = 0; i < instituts.length; i++) {
        institute = instituts[i];
        if (institute.hasSubject(selected_subject)) {
            institute_name = institute.getName();
            instituts_names_array.push(institute_name);
            instituts_names += institute_name + "<br>";
        }
    }

    return instituts_names;
}

function setInstituts() {
    instituts_names_array = [];
    let error_message = ""

    if (subjects.indexOf(selected_subject) == -1) {
        error_message += "не выбран предмет по выбору" + "<br/>";
    }

    if (universities_names.indexOf(selected_university) == -1) {
        error_message += "не выбран университет";
    }

    institute_label.innerHTML = (error_message == "") ? getInstituts() : error_message;
}

function createQuery() {
    let query = {};
    query.full_name = full_name;
    query.selected_subject = selected_subject;

    query.math_score = math_score.value;
    query.russian_score = russian_score.value;
    query.additional_score = additional_subject_score.value;
    query.passing_score = passing_score.value;

    query.selected_university = selected_university;
    query.score_result = score_result;
    query.instituts = instituts_names_array;

    return query;
}

function checkScores() {
    let error_message = "";
    let score;

    for (index in scores) {
        score = scores[index];

        if (isNaN(score.value)) {
            error_message += "<br/>" + "Не заполнено поле \"" + score.label_name + "\"";
        }
    }

    score_result = error_message;
    return error_message == "";
}

function calculateScores() {
    let score_sum = 0;
    let passing_score_int = parseInt(passing_score.value);

    for (let i = 0; i < 3; i++) {
        score_sum += parseInt(scores[i].value);
    }

    score_result = (score_sum >= passing_score_int) ? "да" : "нет";
}

function setScoreResult() {
    if (checkScores()) {
        calculateScores();
    }

    score_result_label.innerHTML = score_result;
}

function printResult() {
    setScoreResult();
    setInstituts();
}

function saveRequest() {
    let query = createQuery();
    query_items.push(query);
    localStorage.setItem(local_storage_key, JSON.stringify(query_items));
}

function setOptions() {
    let full_name_input = document.getElementById("full_name");
    let print_full_name = document.getElementById("print_full_name");

    full_name_input.oninput = function () {
        full_name = this.value;
        print_full_name.innerHTML = full_name;
    }

    let subject_selector = document.getElementById("subjects");

    subject_selector.append(new Option("Выберите предмет по выбору"));

    for (let i = 0; i < subjects.length; i++) {
        subject_selector.append(new Option(subjects[i]));
    }

    subject_selector.onchange = function () {
        selected_subject = this[this.selectedIndex].value;
    }

    let math_score_input = document.getElementById("maths");
    math_score_input.oninput = function () {
        math_score.value = this.value;
    }

    let russian_score_input = document.getElementById("russian");
    russian_score_input.oninput = function () {
        russian_score.value = this.value;
    }

    let additional_subject_score_input = document.getElementById("selected_subject");
    additional_subject_score_input.oninput = function () {
        additional_subject_score.value = this.value;
    }

    let passing_score_input = document.getElementById("passing_score");
    passing_score_input.oninput = function () {
        passing_score.value = this.value;
    }

    let universities_selector = document.getElementById("universities");

    universities_selector.append(new Option("Выберите университет"));

    for (let index in universities_names) {
        universities_selector.append(new Option(universities_names[index]));
    }

    universities_selector.onchange = function () {
        selected_university = this[this.selectedIndex].value;
    }

    let submitButton = document.getElementById("submitButton");
    submitButton.onclick = function () {
        printResult();
        saveRequest();
    };

    let clear_button = document.getElementById("clear_button")
    clear_button.onclick = function () {
        full_name_input.value = ""
        print_full_name.innerText = ""
        subject_selector.selectedIndex = 0;
        math_score_input.value = ""
        russian_score_input.value = ""
        additional_subject_score_input.value = ""
        passing_score_input.value = ""
        universities_selector.selectedIndex = 0
        score_result_label.innerText = ""
        institute_label.innerHTML = ""
    }

    let back_button = document.getElementById("back_button")
    back_button.onclick = function() {
        location.href = "../main.html"
    }
}

window.onload = setOptions();