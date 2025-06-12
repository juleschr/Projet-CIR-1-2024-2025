#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>


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
