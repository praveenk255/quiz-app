let allQuestions = [];
let questionsAttempted = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

const quizContainer = document.getElementById('quizContainer');
const submitBtn = document.getElementById('submitBtn');
const sheetSelector = document.getElementById('sheetSelector');

async function loadQuiz() {
    const url = sheetSelector.value;
    const res = await fetch(url);
    const text = await res.text();
    parseCSV(text);
    renderQuiz();
}

function parseCSV(csvText) {
    allQuestions = [];
    const lines = csvText.trim().split('\n');
    lines.forEach((line, i) => {
        const [sno, question, opt1, opt2, opt3, opt4, correct] = line.split(',');
        allQuestions.push({
            sno,
            question,
            options: [opt1,opt2,opt3,opt4],
            correct: parseInt(correct),
            answeredCorrectly: null,
            userSelectedIndex: null
        });
    });
}

function renderQuiz() {
    quizContainer.innerHTML = '';
    allQuestions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = "bg-white p-4 mb-2 rounded shadow";
        const qEl = document.createElement('p');
        qEl.textContent = `${q.sno || idx+1}. ${q.question}`;
        card.appendChild(qEl);
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.className = 'block mt-2 w-full border p-2 rounded text-left';
            btn.onclick = () => {
                if (card.dataset.answered) return;
                q.userSelectedIndex = i;
                if (i === q.correct) {
                    q.answeredCorrectly = true;
                    correctAnswers++;
                } else {
                    q.answeredCorrectly = false;
                    incorrectAnswers++;
                }
                questionsAttempted++;
                card.dataset.answered = true;
                btn.style.backgroundColor = i === q.correct ? 'lightgreen' : 'salmon';
            }
            card.appendChild(btn);
        });
        quizContainer.appendChild(card);
    });
}

sheetSelector.addEventListener('change', () => {
    questionsAttempted = correctAnswers = incorrectAnswers = 0;
    loadQuiz();
});

submitBtn.addEventListener('click', () => {
    const mistakes = [];
    allQuestions.forEach(q=>{
        if(q.answeredCorrectly===false || q.answeredCorrectly===null){
            mistakes.push({
                sno: q.sno,
                question: q.question,
                options: q.options,
                userAnswerIndex: q.userSelectedIndex,
                correctIndex: q.correct,
                unattempted: q.answeredCorrectly===null
            });
        }
    });
    fetch('save_stats.php',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            quizName: sheetSelector.selectedOptions[0].text,
            sheetUrl: sheetSelector.value,
            attempted: questionsAttempted,
            correct: correctAnswers,
            incorrect: incorrectAnswers,
            mistakes
        })
    }).then(r=>r.json()).then(json=>{
        console.log('Saved stats:', json);
        alert('Quiz submitted!');
    });
});

// load first quiz on page load
loadQuiz();
