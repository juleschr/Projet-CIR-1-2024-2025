function attaque(vie, atk, CD){
    if(vie== 0){
        return 0;
    }
    
    let lancer_D20 = (Math.random()*20)+1; // donne un nombre entre 1 et 20 
    let degats = lancer_D20+ atk_perso;
    if(degats >= CD){
        let lancer_D8 = (Math.random()*8)+1;
        let degats_infliger = (lancer_D8*2) - CD + atk;
        vie = vie - degats_infliger;
    }
    return attaque(vie, atk,CD);
}

function defense(vie , def , CD){
    
}

function main(){

}