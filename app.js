var startButton = document.getElementById('startButton')
var nextButton = document.getElementById('nextButton')
const questionContainerElement = document.getElementById('question-container')
var resultBox = document.getElementById('result')
let shuffleQuestions, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
let correctCount = 0;
let question = [];


//-----------------------------------------------------------//
//is json failo i masyva
fetch("questions.json").then(res => {
    return res.json();
})
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        question = loadedQuestions;

    });


   
//-----------------------------------------------------------//

function startGame() {
    console.log('started')
    correctCount = 0;
    //prie start mygtuko pridedam klase "hide" kad paslepti
    startButton.classList.add('hide')
    //resultBox.classList.add('hide')

    //paima bet kuri klausima is array:
    shuffleQuestions = question.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;

    //pasalinam klase 'hide' kad parodytu klausimas
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    reset()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

//-----------------------------------------------------------//

function showQuestion(question) {
    //html'e pakeici klausima i masyve esanti klausima
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        //?????createElement???
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            ///????dataset???

            button.dataset.correct = answer.correct

        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}



//-----------------------------------------------------------//
function reset() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')

    //???firstchild???
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }

}


//-----------------------------------------------------------//

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusclass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusclass(button, button.dataset.correct)
    })

if (selectedButton.dataset = correct) {
        correctCount++;

    }


    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        document.getElementById('result').innerHTML = 'RESULT   ' + correctCount + ' / '+ question.length;
        startButton.innerText = 'Restart'
        resultBox.classList.remove('hide')

        startButton.classList.remove('hide')



    }
    
    
}


//-----------------------------------------------------------//


function setStatusclass(element, correct) {
    clearStatusClass(element)
    if (correct) {

        element.classList.add('correct')

    }
    else {
        element.classList.add('wrong')
    }
}
//-----------------------------------------------------------//
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

