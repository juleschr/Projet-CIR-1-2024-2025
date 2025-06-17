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
        console.log(`Attaque réussie ! Dégâts infligés : ${degats_infliger}`);
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
        console.log(`Défense réussie ! Vie récupérée : ${vie_recuperee}`);
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
                <img src="https://cdn.pixabay.com/photo/2014/04/03/10/32/knight-312588_1280.png" alt="Héros">
                <div class="name">Héros</div>
                <div class="stat" id="hero-vie">Vie : 10</div>
                <div class="stat" id="hero-atk">ATK : 5</div>
                <div class="stat" id="hero-cd-atk">CD ATK : 12</div>
                <div class="stat" id="hero-cd-def">CD DEF : 10</div>
            </div>
            <div class="stat-block" id="enemy-stats">
                <img src="https://cdn.pixabay.com/photo/2013/07/13/12/46/orc-146063_1280.png" alt="Ennemi">
                <div class="name">Ennemi</div>
                <div class="stat" id="enemy-vie">Vie : 5</div>
                <div class="stat" id="enemy-atk">ATK : 4</div>
                <div class="stat" id="enemy-cd-atk">CD ATK : 11</div>
                <div class="stat" id="enemy-cd-def">CD DEF : 9</div>
            </div>
        </div>
    `);

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

}

main();