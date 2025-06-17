function attaque(vie_cible, atk, CD) {
    if (vie_cible <= 0) {
        return 0;
    }

    let lancer_D20 = Math.floor(Math.random() * 20) + 1; // nombre entre 1 et 20
    let attaque_reussie = lancer_D20 + atk;
    if (attaque_reussie >= CD) {
        let lancer_D8 = Math.floor(Math.random() * 8) + 1;
        let degats_infliger = Math.max((lancer_D8 * 2) - CD + atk, 0);
        vie_cible = vie_cible - degats_infliger;
        console.log("Attaque réussie ! Dégâts infligés : ${degats_infliger}");
    } else {
        console.log("Attaque ratée !");
    }
    return Math.max(vie_cible, 0);
}

function defense(vie_defenseur, def, CD) {
    if (vie_defenseur <= 0) {
        return 0;
    }

    let lancer_D20 = Math.floor(Math.random() * 20) + 1; // nombre entre 1 et 20
    let defense_reussie = lancer_D20 + def;
    console.log(defense_reussie);
    if (defense_reussie >= CD) {
        let lancer_D6 = Math.floor(Math.random() * 6) + 1;
        let vie_recuperee = Math.max((lancer_D6 * 2) - CD + def, 0);
        vie_defenseur = vie_defenseur + vie_recuperee;
        console.log("Défense réussie ! Vie récupérée : ${vie_recuperee}");
    } else {
        console.log("L'attaque n'est pas parvenue à percer la défense de l'adversaire");
    }
    return vie_defenseur;
}


function combat(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie){
    while (vie_hero > 0 && vie_enemie > 0) {
        // Le héros attaque l'ennemi
        vie_enemie = attaque(vie_enemie, atk_hero, CD_atk_hero);
        if (vie_enemie <= 0) {
            console.log("Le héros a gagné !");
            break;
        }

        // L'ennemi se défend
        vie_enemie = defense(vie_enemie, atk_enemie, CD_def_enemie);

        // L'ennemi attaque le héros
        vie_hero = attaque(vie_hero, atk_enemie, CD_atk_enemie);
        if (vie_hero <= 0) {
            console.log("L'ennemi a gagné !");
            break;
        }

        // Le héros se défend
        vie_hero = defense(vie_hero, atk_hero, CD_def_hero);
    }
    
}


function fenetrecombat(){
    
    let combatWindow = window.open("", "Combat", "width=600,height=400");
    combatWindow.document.write("<h2>Combat en cours...</h2><pre id='log'></pre>");

    const originalLog = console.log;
    console.log = function(msg) {
        originalLog.apply(console, arguments);
        if (combatWindow && !combatWindow.closed) {
            combatWindow.document.getElementById('log').textContent += msg + "\n";
        }
    };

    // Ajout des boutons dans la fenêtre de combat
    combatWindow.document.write(`
        <button id="btnAttaquer" disabled>Attaquer</button>
        <button id="btnDefendre" disabled>Défendre</button>
    `);
    // Ajout de styles CSS pour améliorer l'interface
    combatWindow.document.write(`
        <style>
            body {
                background: linear-gradient(135deg, #232526 0%, #414345 100%);
                color: #f8f8f2;
                font-family: 'Segoe UI', 'Arial', sans-serif;
                margin: 0;
                padding: 0;
            }
            h2 {
                text-align: center;
                font-family: 'Cinzel', serif;
                letter-spacing: 2px;
                color: #ffd700;
                margin-top: 20px;
            }
            #log {
                background: rgba(0,0,0,0.7);
                border-radius: 8px;
                padding: 16px;
                min-height: 180px;
                font-size: 1.1em;
                font-family: 'Fira Mono', monospace;
                margin: 20px;
                color: #b6e1fc;
                box-shadow: 0 2px 8px #0008;
            }
            #combat-ui {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin: 20px 0;
            }
            .stat-block {
                background: #222c;
                border-radius: 8px;
                padding: 12px 18px;
                min-width: 140px;
                text-align: center;
                box-shadow: 0 1px 4px #0006;
            }
            .stat-block img {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                margin-bottom: 8px;
                border: 2px solid #ffd700;
                background: #fff2;
            }
            .stat-block .name {
                font-weight: bold;
                color: #ffd700;
                font-size: 1.1em;
                margin-bottom: 4px;
            }
            .stat-block .stat {
                font-size: 0.98em;
                margin: 2px 0;
            }
            button {
                background: linear-gradient(90deg, #ffd700 0%, #ff9800 100%);
                color: #232526;
                border: none;
                border-radius: 6px;
                padding: 10px 24px;
                font-size: 1.1em;
                font-family: inherit;
                font-weight: bold;
                margin: 8px;
                cursor: pointer;
                transition: background 0.2s, transform 0.2s;
                box-shadow: 0 2px 6px #0004;
            }
            button:disabled {
                background: #888a;
                color: #eee;
                cursor: not-allowed;
                transform: none;
            }
            #arena-canvas {
                display: block;
                margin: 0 auto 16px auto;
                background: #222;
                border-radius: 12px;
                box-shadow: 0 2px 12px #0008;
            }
        </style>
    `);

    // Ajout d'un canvas pour l'arène de combat et des blocs de stats
    combatWindow.document.write(`
        <canvas id="arena-canvas" width="400" height="120"></canvas>
        <div id="combat-ui">
            <div class="stat-block" id="hero-stats">
                <img src="images/hero.jpg" alt="Héros">
                <div class="name">Héros</div>
                <div class="stat" id="hero-vie">Vie : 10</div>
                <div class="stat" id="hero-atk">ATK : 5</div>
                <div class="stat" id="hero-cd-atk">CD ATK : 12</div>
                <div class="stat" id="hero-cd-def">CD DEF : 10</div>
            </div>
            <div class="stat-block" id="enemy-stats">
                <img src="images/enemie.jpg" alt="Ennemi">
                <div class="name">Ennemi</div>
                <div class="stat" id="enemy-vie">Vie : 5</div>
                <div class="stat" id="enemy-atk">ATK : 4</div>
                <div class="stat" id="enemy-cd-atk">CD ATK : 11</div>
                <div class="stat" id="enemy-cd-def">CD DEF : 9</div>
            </div>
        </div>
    `);
    // Fonction pour animer le lancer de dé au centre de l'arène
    async function animateDiceRoll(type, result) {
        // type: "D20", "D8", "D6"
        // result: valeur finale à afficher
        // S'assure que le canvas garde la bonne taille même en plein écran
        function resizeCanvas() {
            const canvas = combatWindow.document.getElementById('arena-canvas');
            if (!canvas) return;
            // Largeur responsive, mais hauteur fixe pour garder la zone centrale
            let width = Math.min(600, combatWindow.innerWidth - 40);
            if (width < 320) width = 320;
            canvas.width = width;
            canvas.height = 120;
        }
        resizeCanvas();
        combatWindow.addEventListener('resize', resizeCanvas);
        const canvas = combatWindow.document.getElementById('arena-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const diceX = canvas.width / 2;
        const diceY = canvas.height / 2 + 10;
        const diceSize = 38;

        // Efface la zone centrale
        function clearDice() {
            ctx.clearRect(diceX - diceSize, diceY - diceSize, diceSize * 2, diceSize * 2);
        }

        // Dessine un dé simple (carré ou octogone) avec une valeur
        function drawDice(val, highlight = false) {
            clearDice();
            ctx.save();
            ctx.translate(diceX, diceY);

            // Forme du dé selon le type
            ctx.beginPath();
            if (type === "D20") {
                // Icône pentagone étoilé pour D20
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(
                        Math.cos((18 + i * 72) * Math.PI / 180) * diceSize,
                        Math.sin((18 + i * 72) * Math.PI / 180) * diceSize
                    );
                }
            } else if (type === "D8") {
                // Octogone pour D8
                for (let i = 0; i < 8; i++) {
                    ctx.lineTo(
                        Math.cos((22.5 + i * 45) * Math.PI / 180) * diceSize,
                        Math.sin((22.5 + i * 45) * Math.PI / 180) * diceSize
                    );
                }
            } else {
                // Carré pour D6
                ctx.rect(-diceSize, -diceSize, diceSize * 2, diceSize * 2);
            }
            ctx.closePath();
            ctx.fillStyle = highlight ? "#ffd700" : "#fff";
            ctx.globalAlpha = 0.92;
            ctx.shadowColor = "#000";
            ctx.shadowBlur = highlight ? 16 : 6;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 3;
            ctx.stroke();

            // Texte du résultat
            ctx.fillStyle = "#222";
            ctx.font = "bold 24px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(val, 0, 2);

            ctx.restore();
        }

        // Animation de roulement
        let frames = 18 + Math.floor(Math.random() * 6);
        let lastVal = 1;
        for (let i = 0; i < frames; i++) {
            let val;
            if (type === "D20") val = Math.floor(Math.random() * 20) + 1;
            else if (type === "D8") val = Math.floor(Math.random() * 8) + 1;
            else val = Math.floor(Math.random() * 6) + 1;
            lastVal = val;
            drawDice(val, false);
            await new Promise(r => setTimeout(r, 40 + i * 4));
        }
        // Affiche le résultat final en surbrillance
        drawDice(result, true);
        await new Promise(r => setTimeout(r, 650));
        clearDice();
    }

    // On intercepte les lancers de dés dans attaque/defense pour l'animation
    // On redéfinit temporairement Math.random pour capturer la valeur du dé
    function getDiceRoll(type, min, max) {
        // type: "D20", "D8", "D6"
        let val = Math.floor(Math.random() * (max - min + 1)) + min;
        animateDiceRoll(type, val);
        return val;
    }

    // Patch temporaire des fonctions attaque/defense pour utiliser l'animation
    const oldAttaque = attaque;
    attaque = function(vie_cible, atk, CD) {
        if (vie_cible <= 0) return 0;
        let lancer_D20 = getDiceRoll("D20", 1, 20);
        let attaque_reussie = lancer_D20 + atk;
        if (attaque_reussie >= CD) {
            let lancer_D8 = getDiceRoll("D8", 1, 8);
            let degats_infliger = Math.max((lancer_D8 * 2) - CD + atk, 0);
            vie_cible = vie_cible - degats_infliger;
            console.log(`Attaque réussie ! Dégâts infligés : ${degats_infliger}`);
        } else {
            console.log("Attaque ratée !");
        }
        return Math.max(vie_cible, 0);
    };

    const oldDefense = defense;
    defense = function(vie_defenseur, def, CD) {
        if (vie_defenseur <= 0) return 0;
        let lancer_D20 = getDiceRoll("D20", 1, 20);
        let defense_reussie = lancer_D20 + def;
        console.log(defense_reussie);
        if (defense_reussie >= CD) {
            let lancer_D6 = getDiceRoll("D6", 1, 6);
            let vie_recuperee = Math.max((lancer_D6 * 2) - CD + def, 0);
            vie_defenseur = vie_defenseur + vie_recuperee;
            console.log(`Défense réussie ! Vie récupérée : ${vie_recuperee}`);
        } else {
            console.log("L'attaque n'est pas parvenue à percer la défense de l'adversaire");
        }
        return vie_defenseur;
    };
    // Fonction pour mettre à jour les stats affichées
    function updateStats(vh, ah, cdh_atk, cdh_def, ve, ae, cde_atk, cde_def) {
        combatWindow.document.getElementById('hero-vie').textContent = `Vie : ${vh}`;
        combatWindow.document.getElementById('hero-atk').textContent = `ATK : ${ah}`;
        combatWindow.document.getElementById('hero-cd-atk').textContent = `CD ATK : ${cdh_atk}`;
        combatWindow.document.getElementById('hero-cd-def').textContent = `CD DEF : ${cdh_def}`;
        combatWindow.document.getElementById('enemy-vie').textContent = `Vie : ${ve}`;
        combatWindow.document.getElementById('enemy-atk').textContent = `ATK : ${ae}`;
        combatWindow.document.getElementById('enemy-cd-atk').textContent = `CD ATK : ${cde_atk}`;
        combatWindow.document.getElementById('enemy-cd-def').textContent = `CD DEF : ${cde_def}`;
    }

    // Fonction pour dessiner les barres de vie sur le canvas
    function drawArena(heroVie, heroVieMax, enemyVie, enemyVieMax) {
        const canvas = combatWindow.document.getElementById('arena-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Héros
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 18px Cinzel, serif";
        ctx.fillText("Héros", 30, 30);

        ctx.fillStyle = "#444";
        ctx.fillRect(30, 40, 120, 18);
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(30, 40, 120 * (heroVie / heroVieMax), 18);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(30, 40, 120, 18);

        ctx.fillStyle = "#fff";
        ctx.font = "14px monospace";
        ctx.fillText(`${heroVie} / ${heroVieMax}`, 60, 55);

        // Ennemi
        ctx.fillStyle = "#ff9800";
        ctx.font = "bold 18px Cinzel, serif";
        ctx.fillText("Ennemi", 250, 30);

        ctx.fillStyle = "#444";
        ctx.fillRect(250, 40, 120, 18);
        ctx.fillStyle = "#e53935";
        ctx.fillRect(250, 40, 120 * (enemyVie / enemyVieMax), 18);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(250, 40, 120, 18);

        ctx.fillStyle = "#fff";
        ctx.font = "14px monospace";
        ctx.fillText(`${enemyVie} / ${enemyVieMax}`, 280, 55);

        // Optionnel : animation d'épées ou effets
        ctx.strokeStyle = "#ffd700";
        ctx.beginPath();
        ctx.moveTo(150, 90); ctx.lineTo(180, 60);
        ctx.moveTo(160, 60); ctx.lineTo(190, 90);
        ctx.stroke();

        ctx.strokeStyle = "#ff9800";
        ctx.beginPath();
        ctx.moveTo(250, 90); ctx.lineTo(220, 60);
        ctx.moveTo(240, 60); ctx.lineTo(210, 90);
        ctx.stroke();
    }

    // Sauvegarde des valeurs max pour les barres de vie
    let heroVieMax = 10, enemyVieMax = 5;

    // Redéfinir la fonction combat pour intégrer la mise à jour de l'UI
    combat = async function(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie) {
        heroVieMax = vie_hero;
        enemyVieMax = vie_enemie;
        updateStats(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie);
        drawArena(vie_hero, heroVieMax, vie_enemie, enemyVieMax);

        while (vie_hero > 0 && vie_enemie > 0) {
            // Attente du clic pour attaquer
            btnAttaquer.disabled = false;
            btnDefendre.disabled = true;
            combatWindow.document.getElementById('log').textContent += "À vous d'attaquer ! Cliquez sur Attaquer.\n";
            await attendreClic(btnAttaquer);

            // Le héros attaque l'ennemi
            vie_enemie = attaque(vie_enemie, atk_hero, CD_atk_hero);
            updateStats(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie);
            drawArena(vie_hero, heroVieMax, vie_enemie, enemyVieMax);
            if (vie_enemie <= 0) {
                console.log("Le héros a gagné !");
                break;
            }

            // L'ennemi se défend (automatique)
            vie_enemie = defense(vie_enemie, atk_enemie, CD_def_enemie);
            updateStats(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie);
            drawArena(vie_hero, heroVieMax, vie_enemie, enemyVieMax);

            // L'ennemi attaque le héros (automatique)
            vie_hero = attaque(vie_hero, atk_enemie, CD_atk_enemie);
            updateStats(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie);
            drawArena(vie_hero, heroVieMax, vie_enemie, enemyVieMax);
            if (vie_hero <= 0) {
                console.log("L'ennemi a gagné !");
                break;
            }

            // Attente du clic pour se défendre
            btnAttaquer.disabled = true;
            btnDefendre.disabled = false;
            combatWindow.document.getElementById('log').textContent += "À vous de vous défendre ! Cliquez sur Défendre.\n";
            await attendreClic(btnDefendre);

            // Le héros se défend
            vie_hero = defense(vie_hero, atk_hero, CD_def_hero);
            updateStats(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie);
            drawArena(vie_hero, heroVieMax, vie_enemie, enemyVieMax);
        }
    };

    const btnAttaquer = combatWindow.document.getElementById('btnAttaquer');
    const btnDefendre = combatWindow.document.getElementById('btnDefendre');

    // Fonctions utilitaires pour attendre un clic sur un bouton
    function attendreClic(bouton) {
        return new Promise(resolve => {
            bouton.disabled = false;
            bouton.onclick = () => {
                bouton.disabled = true;
                resolve();
            };
        });
    }

    // Redéfinir la fonction combat pour intégrer les clics
    combat = async function(vie_hero, atk_hero, CD_atk_hero, CD_def_hero, vie_enemie, atk_enemie, CD_atk_enemie, CD_def_enemie) {
        while (vie_hero > 0 && vie_enemie > 0) {
            // Attente du clic pour attaquer
            btnAttaquer.disabled = false;
            btnDefendre.disabled = true;
            combatWindow.document.getElementById('log').textContent += "À vous d'attaquer ! Cliquez sur Attaquer.\n";
            await attendreClic(btnAttaquer);

            // Le héros attaque l'ennemi
            vie_enemie = attaque(vie_enemie, atk_hero, CD_atk_hero);
            if (vie_enemie <= 0) {
                console.log("Le héros a gagné !");
                break;
            }

            // L'ennemi se défend (automatique)
            vie_enemie = defense(vie_enemie, atk_enemie, CD_def_enemie);

            // L'ennemi attaque le héros (automatique)
            vie_hero = attaque(vie_hero, atk_enemie, CD_atk_enemie);
            if (vie_hero <= 0) {
                console.log("L'ennemi a gagné !");
                break;
            }

            // Attente du clic pour se défendre
            btnAttaquer.disabled = true;
            btnDefendre.disabled = false;
            combatWindow.document.getElementById('log').textContent += "À vous de vous défendre ! Cliquez sur Défendre.\n";
            await attendreClic(btnDefendre);

            // Le héros se défend
            vie_hero = defense(vie_hero, atk_hero, CD_def_hero);
        }
    };

    function closeCombatWindow() {
        if (combatWindow && !combatWindow.closed) {
            combatWindow.document.write("<h2>Combat terminé !</h2>");
            setTimeout(() => combatWindow.close(), 2000);
        }
        console.log = originalLog;
    }
    // Fermer la fenêtre à la fin du combat
    // On surveille le log pour détecter la fin
    const observer = new MutationObserver(() => {
        const log = combatWindow.document.getElementById('log').textContent;
        if (log.includes("Le héros a gagné !") || log.includes("L'ennemi a gagné !")) {
            setTimeout(() => closeCombatWindow(), 1800);
            observer.disconnect();
        }
    });
    observer.observe(combatWindow.document.getElementById('log'), { childList: true, characterData: true, subtree: true });
    
}

function combat_result(){
    const log = document.getElementById('log').textContent;
    if (log.includes("Le héros a gagné !")) {
        window.location.href = "7b.html";
    } else if (log.includes("L'ennemi a gagné !")) {
        window.location.href = "9.html";
    }

}

function main(){
    
    fenetrecombat()
    combat(
        10, // vie_hero
        5,  // atk_hero
        12, // CD_atk_hero
        10, // CD_def_hero
        5, // vie_enemie
        4,  // atk_enemie
        11, // CD_atk_enemie
        9   // CD_def_enemie
    );
    combat_result();

}

main();