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
            char txt[512];
            sscanf(line,"<chapter id\"%d\">%[^>]s",txt); // extrait l'id et le titre de la balise chapter
        }
    }

}


// Affiche le contenu dans une balise <p>
void afficher_p(const char* txt) {
    printf("<p>");
    for (size_t i = 0; txt[i]; ++i) {
        if (txt[i] == '\n') {
            putchar(' '); // permet d'afficher les espace 
        } else {
            putchar(txt[i]); // affiche le texte dans la balise p
        }
    }
    printf("</p>\n");
}

// Utilisation
void get_p(const char* filename) {
    char* txt = lire_fichier(filename);
    if (txt) {
        afficher_p(txt);
        free(txt);
    }
}


int main(){
    // Remplacez "votre_fichier.txt" par le nom de votre fichier à tester
    get_p("book.txt");
    return 0;
}