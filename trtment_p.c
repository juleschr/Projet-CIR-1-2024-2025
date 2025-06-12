#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>



void lire_p(const char* filename){
    FILE* file = fopen(filename, "r");
    if(!file){
        perror("error while file's opening");
        return;
    }
    
    char line[512];
    
    while(fgets(line, sizeof(line), file)){    // ...
        if(strstr("<p>",line)){ // verifie si la ligne contient la balise p
            char texte[512];
            sscanf(line,"<chapter id\"%d\">%[^>]s",texte); // extrait l'id et le titre de la balise chapter
        }
    }

}


// Affiche le contenu dans une balise <p>
void afficher_p(const char* txt) {
    printf("<p>");
    for (size_t i = 0; txt[i]; ++i) {
        if (txt[i] == '\n') {
            putchar(' ');
        } else {
            putchar(txt[i]);
        }
    }
    printf("</p>\n");
}

// Utilisation
void get_p(const char* filename) {
    char* texte = lire_fichier(filename);
    if (texte) {
        afficher_p(texte);
        free(texte);
    }
}
