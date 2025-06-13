#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>



void lire_p(const char* filename){
    FILE* file = fopen(filename, "r"); // ouvre le fichier 
    if(!file){   
        // verifie si le fichier n'est pas vide ou corompue 
        perror("error while file's opening");
        return;
    }
    
    char line[512];
    
    while(fgets(line, sizeof(line), file)){    // tant que l'on lis bien la ligne <p>
        if(strstr("<p>",line)){ // verifie si la ligne contient la balise p
            char txt[512];
            sscanf(line,"<p\"%d\">%[^>]s",txt); // extrait l'id et le titre de la balise chapter
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

// Extrait et affiche le texte entre <p> et </p>
void get_p(const char* filename) {
    FILE* file = fopen(filename, "r");
    if (!file) {
        perror("error while file's opening");
        return;
    }
    char line[512];
    while (fgets(line, sizeof(line), file)) {
        char* start = strstr(line, "<p>");
        char* end = strstr(line, "</p>");
        if (start && end && end > start) {
            start += 3; // avance après <p>
            char contenu[1024];
            size_t len = end - start;
            strncpy(contenu, start, len);
            contenu[len] = '\0';
            afficher_p(contenu);
        }
    }
    fclose(file);
}


int main(){

    get_p("book.txt");
    return 0;
}