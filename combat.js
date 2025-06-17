function attaque( vie_assaillant,atk, CD){
    if(vie_assaillant == 0){
        return 1;
    }
    
    let lancer_D20 = (Math.random()*20)+1; // donne un nombre entre 1 et 20 
    let attaque_reussie = lancer_D20+ atk_perso;
    if(attaque_reussie >= CD){
        let lancer_D8 = (Math.random()*8)+1;
        let degats_infliger = (lancer_D8*2) - CD + atk;
        vie_restante = vie - degats_infliger;
    }
    return attaque(vie_restante, atk,CD);
}

function defense(vie_defenseur , def , CD){
    if (vie_defenseur == 0) {
        return 0;
    }

    let lancer_D20 = (Math.random() * 20) + 1; // nombre entre 1 et 20
    let defense_reussie = lancer_D20 + def;
    console.log(defense_reussie);
    if (defense_reussie >= CD) {
        let lancer_D6 = (Math.random() * 6) + 1;
        let vie_recuperee = (lancer_D6 * 2) - CD + def;
        vie = vie + vie_recuperee;
    }else{
        console.log("l'attaque n'es pas parvenue a percer la defense l'adversaire")
    }
    return defense(vie_restante, def, CD);
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

function main(){
    combat(
        30, // vie_hero
        5,  // atk_hero
        12, // CD_atk_hero
        10, // CD_def_hero
        25, // vie_enemie
        4,  // atk_enemie
        11, // CD_atk_enemie
        9   // CD_def_enemie
    );
}