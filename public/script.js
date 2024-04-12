let currentWordIndex = 0;
let words = [];

document.addEventListener("DOMContentLoaded", function() {
    fetchWords();
});

function fetchWords(chapter = 1) {
    fetch(`/wordlist?chapter=${chapter}`)
        .then(response => response.json())
        .then(data => {
            words = data; // 서버로부터 받은 단어 목록을 저장
            displayWords(); // 단어 목록을 화면에 표시
        })
        .catch(error => console.error("Fetching words failed:", error));
}

function displayWords() {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = ''; // 기존 목록을 초기화
    words.forEach((wordObj, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = wordObj.word;
        listItem.addEventListener("click", () => showFullScreenWord(index));
        wordList.appendChild(listItem);
    });
}

function showFullScreenWord(index) {
    const fullScreenWordDiv = document.getElementById("fullScreenWord");
    const wordDisplay = document.getElementById("wordDisplay");
    currentWordIndex = index;
    wordDisplay.textContent = `${words[currentWordIndex].word} - ${words[currentWordIndex].meaning}`;
    fullScreenWordDiv.classList.remove("hidden");
    document.getElementById("nextWordBtn").addEventListener("click", showNextWord);
}

function showNextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.textContent = `${words[currentWordIndex].word} - ${words[currentWordIndex].meaning}`;
}

document.getElementById("fullScreenWord").addEventListener("click", function(e) {
    if (e.target.id === "fullScreenWord") {
        document.getElementById("fullScreenWord").classList.add("hidden");
    }
});
