// --- ORDBANK (Data) ---
const allQuestions = [
    // --- SYNONYMER ---
    { word: "Glad", type: "synonym", correct: "Lykkelig", options: ["Lykkelig", "Sur", "Sint", "Trist"] },
    { word: "Rask", type: "synonym", correct: "Hurtig", options: ["Hurtig", "Treg", "Sakte", "Stille"] },
    { word: "Vanskelig", type: "synonym", correct: "Krevende", options: ["Krevende", "Lett", "Enkel", "Morsom"] },
    { word: "Venn", type: "synonym", correct: "Kamerat", options: ["Kamerat", "Fiende", "Ukjent", "Søster"] },
    { word: "Begynne", type: "synonym", correct: "Starte", options: ["Starte", "Slutte", "Vente", "Løpe"] },
    { word: "Hus", type: "synonym", correct: "Bolig", options: ["Bolig", "Telt", "Skog", "Bil"] },
    { word: "Snakke", type: "synonym", correct: "Prate", options: ["Prate", "Tie", "Skrike", "Høre"] },
    { word: "Gave", type: "synonym", correct: "Presang", options: ["Presang", "Straff", "Brev", "Lån"] },
    { word: "Redd", type: "synonym", correct: "Engstelig", options: ["Engstelig", "Tøff", "Modig", "Sterk"] },
    { word: "Se", type: "synonym", correct: "Titte", options: ["Titte", "Lukke", "Gjemme", "Høre"] },
    { word: "Rope", type: "synonym", correct: "Skrike", options: ["Skrike", "Hviske", "Snakke", "Nynne"] },
    { word: "Våt", type: "synonym", correct: "Fuktig", options: ["Fuktig", "Tørr", "Varm", "Hard"] },
    { word: "Flott", type: "synonym", correct: "Vakker", options: ["Vakker", "Stygg", "Ekkel", "Kjedelig"] },
    { word: "Bil", type: "synonym", correct: "Kjøretøy", options: ["Kjøretøy", "Sykkel", "Båt", "Fly"] },
    { word: "Jobb", type: "synonym", correct: "Arbeid", options: ["Arbeid", "Ferie", "Skole", "Lek"] },
    { word: "Stille", type: "synonym", correct: "Rolig", options: ["Rolig", "Bråkete", "Høy", "Rask"] },
    { word: "Rik", type: "synonym", correct: "Velstående", options: ["Velstående", "Fattig", "Sulten", "Trist"] },
    { word: "Gå", type: "synonym", correct: "Vandre", options: ["Vandre", "Sitte", "Ligge", "Kjøre"] },

    // --- ANTONYMER ---
    { word: "Stor", type: "antonym", correct: "Liten", options: ["Liten", "Enorm", "Gigantisk", "Høy"] },
    { word: "Varm", type: "antonym", correct: "Kald", options: ["Kald", "Het", "Lunken", "Kokende"] },
    { word: "Dag", type: "antonym", correct: "Natt", options: ["Natt", "Morgen", "Kveld", "Lys"] },
    { word: "Rik", type: "antonym", correct: "Fattig", options: ["Fattig", "Penger", "Gull", "Dyr"] },
    { word: "Tørr", type: "antonym", correct: "Våt", options: ["Våt", "Ørken", "Varm", "Hard"] },
    { word: "Opp", type: "antonym", correct: "Ned", options: ["Ned", "Bort", "Fram", "Høyt"] },
    { word: "Inn", type: "antonym", correct: "Ut", options: ["Ut", "Mellom", "Inni", "På"] },
    { word: "Svart", type: "antonym", correct: "Hvit", options: ["Hvit", "Mørk", "Grå", "Blå"] },
    { word: "Ung", type: "antonym", correct: "Gammel", options: ["Gammel", "Barn", "Ny", "Frisk"] },
    { word: "Billig", type: "antonym", correct: "Dyr", options: ["Dyr", "Gratis", "Kostbar", "Lite"] },
    { word: "Stenge", type: "antonym", correct: "Åpne", options: ["Åpne", "Låse", "Lukke", "Gjemme"] },
    { word: "Sist", type: "antonym", correct: "Først", options: ["Først", "Senere", "Aldri", "Alltid"] },
    { word: "Le", type: "antonym", correct: "Gråte", options: ["Gråte", "Smile", "Rope", "Snakke"] },
    { word: "Elske", type: "antonym", correct: "Hate", options: ["Hate", "Liker", "Kysse", "Klemme"] },
    { word: "Full", type: "antonym", correct: "Tom", options: ["Tom", "Halv", "Mye", "Tung"] },
    { word: "Tung", type: "antonym", correct: "Lett", options: ["Lett", "Hard", "Stor", "Vanskelig"] },
    { word: "Stygg", type: "antonym", correct: "Pen", options: ["Pen", "Ekel", "Skummel", "Slem"] },
    { word: "Levende", type: "antonym", correct: "Død", options: ["Død", "Frisk", "Våken", "Sover"] },
    { word: "Syk", type: "antonym", correct: "Frisk", options: ["Frisk", "Dårlig", "Vond", "Sliten"] }
];

// --- TITLER BASERT PÅ NIVÅ ---
const titles = [
    "Nykomling", "Ord-Lærling", "Ord-Speider", "Ord-Smed", 
    "Ord-Kriger", "Ord-Ridder", "Ord-Ninja", "Ord-Mester", 
    "Ord-Konge/Dronning", "Språk-Legende"
];

// --- TILSTAND ---
let gameState = {
    level: 1,
    currentXP: 0,
    xpNeeded: 100
};

let activeMode = ''; // 'synonym' eller 'antonym'
let currentQuestion = {};
let canClick = true;

// --- OPPSTART ---
window.onload = function() {
    loadGame();
    updateMenuUI();
};

// --- MENY FUNKSJONER ---
function startGame(mode) {
    activeMode = mode;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    
    // Oppdater tekst basert på modus
    const instruction = mode === 'synonym' 
        ? "Finn ordet som betyr det SAMME:" 
        : "Finn ordet som betyr det MOTSATTE:";
    document.getElementById("question-instruction").innerText = instruction;

    updateGameUI();
    nextQuestion();
}

function goToMenu() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    updateMenuUI();
}

// --- SPILL LOGIKK ---
function nextQuestion() {
    canClick = true;
    document.getElementById("feedback-msg").innerText = "";
    
    // Filtrer spørsmål basert på valgt modus
    const modeQuestions = allQuestions.filter(q => q.type === activeMode);
    
    // Velg tilfeldig spørsmål
    const randomIndex = Math.floor(Math.random() * modeQuestions.length);
    currentQuestion = modeQuestions[randomIndex];

    document.getElementById("question-text").innerText = currentQuestion.word;

    // Bland og lag knapper
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    const shuffledOptions = shuffleArray([...currentQuestion.options]);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.className = "quiz-btn";
        btn.onclick = () => checkAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    if (!canClick) return;
    canClick = false;

    const feedback = document.getElementById("feedback-msg");

    if (selected === currentQuestion.correct) {
        // RIKTIG
        feedback.innerText = "Riktig! Bra jobba! 🌟";
        feedback.style.color = "#2e7d32";
        btn.classList.add("correct");
        addXP(20); // Gi 20 XP per riktig svar
    } else {
        // FEIL
        feedback.innerText = `Ikke helt.. Riktig var: ${currentQuestion.correct}`;
        feedback.style.color = "#c62828";
        btn.classList.add("wrong");
    }

    setTimeout(nextQuestion, 2000);
}

// --- XP OG LEVEL SYSTEM ---
function addXP(amount) {
    gameState.currentXP += amount;

    // Sjekk om level up
    if (gameState.currentXP >= gameState.xpNeeded) {
        gameState.currentXP -= gameState.xpNeeded;
        gameState.level++;
        gameState.xpNeeded += 50; // Det blir litt vanskeligere for hvert nivå
        
        alert(`🎉 GRATULERER! 🎉\nDu er nå nivå ${gameState.level}!`);
    }

    saveGame();
    updateGameUI();
}

function getTitle(level) {
    const index = Math.min(level - 1, titles.length - 1);
    return titles[index];
}

// --- UI OPPDATERING ---
function updateGameUI() {
    // Progress bar
    const percentage = (gameState.currentXP / gameState.xpNeeded) * 100;
    document.getElementById("xp-fill").style.width = percentage + "%";
    document.getElementById("xp-text").innerText = `${gameState.currentXP} / ${gameState.xpNeeded} XP`;
    
    // Tekst
    document.getElementById("current-level").innerText = gameState.level;
    document.getElementById("rank-display").innerText = getTitle(gameState.level);
}

function updateMenuUI() {
    document.getElementById("menu-level").innerText = gameState.level;
    document.getElementById("menu-title").innerText = getTitle(gameState.level);
}

// --- HJELPERE ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function saveGame() {
    localStorage.setItem('ordMesterSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('ordMesterSave');
    if (saved) {
        gameState = JSON.parse(saved);
    }
}
