function attaque(vie, atk, CD){
    if(vie== 0){
        return 0;
    }
    
    let lancer_D20 = (Math.random()*20)+1; // donne un nombre entre 1 et 20 
    let attaque_reussie = lancer_D20+ atk_perso;
    if(attaque_reussie >= CD){
        let lancer_D8 = (Math.random()*8)+1;
        let degats_infliger = (lancer_D8*2) - CD + atk;
        vie = vie - degats_infliger;
    }
    return attaque(vie, atk,CD);
}

function defense(vie , def , CD){
    if (vie == 0) {
        return 0;
    }

    let lancer_D20 = (Math.random() * 20) + 1; // nombre entre 1 et 20
    let defense_reussie = lancer_D20 + def;
    if (defense_reussie >= CD) {
        let lancer_D6 = (Math.random() * 6) + 1;
        let vie_recuperee = (lancer_D6 * 2) - CD + def;
        vie = vie + vie_recuperee;
    }
    return defense(vie, def, CD);
}

function main(){

}