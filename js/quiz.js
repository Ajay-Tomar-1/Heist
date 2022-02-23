const start = document.getElementById("start");
const infolist = document.getElementById("info-list");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var x = 0;

let questions = [
    {
        question : "What is the name of this character?",
        imgSrc : "img1/berlin-2.jpg",
        choiceA : "Berlin",
        choiceB : "Helsinki",
        choiceC : "Money Heist",
        choiceD : "Rio",
        correct : "A"
    },{
        question : "What is the name of this character?",
        imgSrc : "img/2.jpg",
        choiceA : "Professor",
        choiceB : "Denver",
        choiceC : "Berlin",
        choiceD : "Oslo",
        correct : "B"
    },{
        question : "This Team was for which heist?",
        imgSrc : "img1/22.jpg",
        choiceA : "Royal Mint of Spain",
        choiceB : "Bank of Spain Heist",
        choiceC : "America - The Money Heist",
        choiceD : "None of Above",
        correct : "A"
    },{
        question : "Who was this character standing in the mask?",
        imgSrc : "img1/character.jpg",
        choiceA : "Helsinki",
        choiceB : "Denver",
        choiceC : "Moscow",
        choiceD : "Arturo Roman",
        correct : "D"
    },{
        question : "How many females are there in this photo? (Hint-Don't go with the hairs)",
        imgSrc : "img1/gender.png",
        choiceA : "1",
        choiceB : "2",
        choiceC : "3",
        choiceD : "4",
        correct : "B"
    },{
        question : "Who is holding the fake gun?",
        imgSrc : "img1/guns.jpg",
        choiceA : "Denver",
        choiceB : "Arturo Roman",
        choiceC : "Both",
        choiceD : "None",
        correct : "A"
    },{
        question : "Who said this?",
        imgSrc : "img1/time.jpg",
        choiceA : "Rio",
        choiceB : "Moscow",
        choiceC : "Berlin",
        choiceD : "Professor",
        correct : "D"
    },{
        question : "What is the name of this character?",
        imgSrc : "img1/nairobi-1.jpg",
        choiceA : "Lisoba",
        choiceB : "Tokyo",
        choiceC : "Nairobi",
        choiceD : "Berlin",
        correct : "C"
    },{
        question : "Choose from the options which is not the meaning of La Casa De Papel?",
        imgSrc : "img1/poster-1.jpg",
        choiceA : "द मनी हाइस्ट",
        choiceB : "The House of Paper",
        choiceC : "The Money Heist",
        choiceD : "The paper of Spain",
        correct : "D"
    },{
        question : "Who was narrating the story?",
        imgSrc : "img1/tokyo.jpg",
        choiceA : "Tokyo",
        choiceB : "Professor",
        choiceC : "Raquel Murillo",
        choiceD : "Rio",
        correct : "A"
    },{
        question : "What is the name of this character?",
        imgSrc : "img1/raquel.jpg",
        choiceA : "Sofia",
        choiceB : "Raquel Murillo",
        choiceC : "Amanda",
        choiceD : "Alicia Sierra",
        correct : "B"
    },{
        question : "The relation between both of them is of ",
        imgSrc : "img1/relation.jpg",
        choiceA : "Mother-Son",
        choiceB : "Brother-Sister",
        choiceC : "Girlfriend-Boyfriend",
        choiceD : "None",
        correct : "C"
    },{
        question : "Who was executing the heist from the outside?",
        imgSrc : "img1/relation-1.jpg",
        choiceA : "Suarez",
        choiceB : "Professor",
        choiceC : "Raquel Murillo",
        choiceD : "Alfonso Prieto",
        correct : "B"
    },{
        question : "This mask is based on which character?",
        imgSrc : "img1/mask.jpg",
        choiceA : "Bella Ciao",
        choiceB : "Salvador Dali",
        choiceC : "Corona",
        choiceD : "Edvard Munch",
        correct : "D"
    },{
        question : "How many characters got died in the first heist?",
        imgSrc : "img1/heist-one-1.jpg",
        choiceA : "1",
        choiceB : "2",
        choiceC : "3",
        choiceD : "4",
        correct : "C"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 580;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    // runningQuestion = Math.floor(Math.random() * 15);
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}


start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    // if (x==0){

    // }
    x++;
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = "Time left:  " + Math.abs(10-count);
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length);
    let img = (scorePerCent > 50) ? "img/sco/success.jpg" :
              (scorePerCent == 50) ? "img/sco/between.jpg" :
              "img/sco/failed.jpg";
    
    // scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p> Your score is  "+ scorePerCent +"%</p>";
}