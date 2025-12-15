// --- SPILLDATA (Spørsmål) ---
// Her kan du legge til så mange ord du vil. 
// Type: 'synonym' eller 'antonym'.
const questions = [
    { word: "Glad", type: "synonym", correct: "Lykkelig", options: ["Lykkelig", "Sur", "Sint", "Trist"] },
    { word: "Stor", type: "antonym", correct: "Liten", options: ["Liten", "Enorm", "Gigantisk", "Høy"] },
    { word: "Rask", type: "synonym", correct: "Hurtig", options: ["Hurtig", "Treg", "Sakte", "Stille"] },
    { word: "Varm", type: "antonym", correct: "Kald", options: ["Kald", "Het", "Lunken", "Kokende"] },
    { word: "Vanskelig", type: "synonym", correct: "Krevende", options: ["Krevende", "Lett", "Enkel", "Morsom"] },
    { word: "Dag", type: "antonym", correct: "Natt", options: ["Natt", "Morgen", "Kveld", "Lys"] },
    { word: "Begynne", type: "synonym", correct: "Starte", options: ["Starte", "Slutte", "Vente", "Løpe"] },
    { word: "Rik", type: "antonym", correct: "Fattig", options: ["Fattig", "Penger", "Gull", "Dyr"] },
    { word: "Venn", type: "synonym", correct: "Kamerat", options: ["Kamerat", "Fiende", "Ukjent", "Søster"] },
    { word: "Tørr", type: "antonym", correct: "Våt", options: ["Våt", "Ørken", "Varm", "Hard"] }
];

// --- VARIABLER FOR SPILLSTATUS ---
let gameState = {
    gold: 0,
    streak: 0,
    city: [] // Liste over ting spilleren har kjøpt (emojis)
};

let currentQuestion = {};
let canClick = true; // Hindrer dobbel-klikk mens vi venter på neste spørsmål

// --- OPPSTART ---
window.onload = function() {
    loadGame(); // Hent lagret spill
    updateStats();
    renderCity();
    nextQuestion();
};

// --- HOVEDFUNKSJONER ---

function nextQuestion() {
    canClick = true;
    document.getElementById("feedback-msg").innerText = "";
    
    // Velg et tilfeldig spørsmål
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    // Oppdater tekst
    document.getElementById("question-text").innerText = currentQuestion.word;
    
    // Vis om eleven skal finne synonym eller antonym
    const typeText = currentQuestion.type === "synonym" ? "Finn synonymet (samme betydning)" : "Finn antonymet (motsatt betydning)";
    document.getElementById("question-type").innerText = typeText;

    // Bland svaralternativene
    const shuffledOptions = shuffleArray([...currentQuestion.options]);

    // Lag knapper
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Tøm gamle knapper

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedOption, btnElement) {
    if (!canClick) return; 
    canClick = false; // Lås knappene midlertidig

    const feedback = document.getElementById("feedback-msg");

    if (selectedOption === currentQuestion.correct) {
        // RIKTIG SVAR
        gameState.streak++;
        
        // Beregn gull: 10 base + streak bonus
        const reward = 10 + (gameState.streak * 2);
        gameState.gold += reward;

        feedback.innerText = `Riktig! +${reward} gull! 🎉`;
        feedback.style.color = "green";
        btnElement.classList.add("correct-answer");
        
        saveGame();
        updateStats();
        
        // Vent 1.5 sekund før neste spørsmål
        setTimeout(nextQuestion, 1500);

    } else {
        // FEIL SVAR
        gameState.streak = 0;
        feedback.innerText = `Feil. Riktig svar var: ${currentQuestion.correct}`;
        feedback.style.color = "red";
        btnElement.classList.add("wrong-answer");

        updateStats();
        // Vent 3 sekunder så de rekker å lese riktig svar
        setTimeout(nextQuestion, 3000);
    }
}

// --- BUTIKK OG BY ---

function buyItem(name, price, emoji) {
    if (gameState.gold >= price) {
        gameState.gold -= price;
        gameState.city.push(emoji);
        
        saveGame();
        updateStats();
        renderCity();
        
        alert(`Du kjøpte en ${name}!`);
    } else {
        alert(`Du har ikke nok gull! Du trenger ${price - gameState.gold} mer.`);
    }
}

function renderCity() {
    const cityArea = document.getElementById("city-area");
    
    if (gameState.city.length > 0) {
        document.getElementById("empty-city-msg").style.display = "none";
        // Tøm området og fyll inn alt på nytt
        cityArea.innerHTML = ""; 
        gameState.city.forEach(item => {
            const span = document.createElement("span");
            span.innerText = item;
            // Legg til en liten animasjon
            span.style.animation = "popIn 0.5s ease";
            cityArea.appendChild(span);
        });
    } else {
        cityArea.innerHTML = '<p id="empty-city-msg">Byen din er tom. Svar på spørsmål for å kjøpe ting!</p>';
    }
}

// --- HJELPEFUNKSJONER ---

function updateStats() {
    document.getElementById("gold-display").innerText = `💰 Gull: ${gameState.gold}`;
    document.getElementById("streak-display").innerText = `🔥 Streak: ${gameState.streak}`;
}

// Blander en liste (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- LAGRING (LocalStorage) ---

function saveGame() {
    localStorage.setItem("ordByenSave", JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem("ordByenSave");
    if (saved) {
        gameState = JSON.parse(saved);
    }
}

function resetGame() {
    if(confirm("Er du sikker på at du vil slette all fremgang?")) {
        localStorage.removeItem("ordByenSave");
        location.reload();
    }
}
