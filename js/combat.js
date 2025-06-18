// ==================
// Character Backend
// ==================

let character = {
    name: "Hero",
    health: 100,
    lives: 3,
    gains: []
};

function saveCharacterState() {
    localStorage.setItem("character", JSON.stringify(character));
}

function loadCharacterState() {
    const stored = localStorage.getItem("character");
    if (stored) {
        character = JSON.parse(stored);
    }
}

function initializeCharacter(name = "Hero") {
    character = {
        name: name,
        health: 100,
        lives: 3,
        gains: []
    };
    saveCharacterState();
}

function displayCharacter() {
    const charDiv = document.getElementById("character-display");

    let hearts = "";
    for (let i = 0; i < character.lives; i++) {
        hearts += "❤️";
    }
///////////here image
    charDiv.innerHTML = `
        <div class="character-section">
            <img src="../hero.jpeg" alt="Character Image">
            <div class="stats"> 
                <h3>${character.name}</h3>

                <div class="health-bar">
                    <div class="health-bar-inner" style="width: ${character.health}%;"></div>
                </div>

                <div class="lives">${hearts}</div>

                <p><strong>Gains:</strong> ${character.gains.join(", ")}</p>
            </div>
        </div>
    `;
}

function updateChoices() {
    document.querySelectorAll("button").forEach(button => {
        let available = true;

        const requiredHealth = parseInt(button.dataset.health || "0");
        if (requiredHealth > 0 && character.health < requiredHealth) {
            available = false;
        }

        const requiredGain = button.dataset.gain;
        if (requiredGain && !character.gains.includes(requiredGain)) {
            available = false;
        }

        button.disabled = !available;
    });
}

function applyButtonActions(button) {
    const healthChange = parseInt(button.dataset.health || "0");
    if (healthChange !== 0) {
        character.health += healthChange;
        if (character.health > 100) character.health = 100;
        if (character.health <= 0) {
            character.lives -= 1;
            character.health = (character.lives > 0) ? 100 : 0;
        }
    }

    const lifeChange = parseInt(button.dataset.life || "0");
    if (lifeChange !== 0) {
        character.lives += lifeChange;
    }

    const gainItem = button.dataset.gain;
    if (gainItem && !character.gains.includes(gainItem)) {
        character.gains.push(gainItem);
    }

    saveCharacterState();
}


//Combat System


function simpleCombat(winChapter, loseChapter) {
    // Simplified random dice system
    let heroRoll = Math.floor(Math.random() * 20) + 1 + 5;  // Hero attack bonus
    let enemyRoll = Math.floor(Math.random() * 20) + 1 + 4; // Enemy attack bonus

    if (heroRoll >= enemyRoll) {
        alert("You won the combat!");
        window.location.href = `${winChapter}.html`;
    } else {
        alert("You lost the combat!");
        character.lives -= 1;
        if (character.lives <= 0) {
            window.location.href = "9.html"; // Game over chapter
        } else {
            saveCharacterState();
            window.location.href = `${loseChapter}.html`;
        }
    }
}

// Button listeners

function setupActionListeners() {
    document.querySelectorAll("button").forEach(button => {
       button.addEventListener("click", (event) => {
        event.preventDefault();

        applyButtonActions(button);

        if (button.dataset.combat && button.dataset.combat.toLowerCase() === "true") {
        simpleCombat(button.dataset.idref, "9");
        } else {
            window.location.href = `${button.dataset.idref}.html`;
        }
        });
        });  
}


// On page load
window.onload = () => {
    loadCharacterState();
    displayCharacter();
    updateChoices();
    setupActionListeners();
};
