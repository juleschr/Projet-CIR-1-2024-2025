#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE 1024

// Fonction qui traite une ligne contenant une balise <choice>
void process_choice_line(const char *line) {
    char idref[20];         // Pour stocker la valeur de l'attribut idref (ex: "04")
    char texte[MAX_LINE];   // Pour stocker le texte avant la balise <a>
    char chapitre[100];     // Pour stocker le contenu de <a>...</a>

    // Recherche de idref="..."
    const char *id_start = strstr(line, "idref=\"");
    if (!id_start) return;  // Si idref n’est pas trouvé, on ne traite pas cette ligne
    id_start += 7;
    const char *id_end = strchr(id_start, '"');
    if (!id_end) return;
    strncpy(idref, id_start, id_end - id_start);
    idref[id_end - id_start] = '\0'; // On termine la chaîne avec \0

    // Recherche du texte avant <a>
    const char *text_start = strchr(line, '>');
    if (!text_start) return;
    text_start++;
    const char *a_start = strstr(text_start, "<a>");
    if (!a_start) return;
    strncpy(texte, text_start, a_start - text_start);
    texte[a_start - text_start] = '\0'; // Texte principal

    // Recherche du contenu de <a>...</a>
    const char *chap_start = a_start + 3;  // Saute "<a>"
    const char *chap_end = strstr(chap_start, "</a>");
    if (!chap_end) return;
    strncpy(chapitre, chap_start, chap_end - chap_start);
    chapitre[chap_end - chap_start] = '\0'; // Titre du lien

    // Affichage du résultat HTML
    printf("<p>%s <a href=\"%s.html\">%s</a></p>\n", texte, idref, chapitre);
}

// Fonction principale qui lit le fichier et traite chaque ligne
void convert_choices_to_html(const char* filename) {
    FILE *file = fopen(filename, "r");  // Ouvre le fichier en lecture
    if (!file) {
        perror("Erreur d'ouverture du fichier");
        return;
    }

    char line[MAX_LINE];
    // Lecture du fichier ligne par ligne
    while (fgets(line, sizeof(line), file)) {
        // Si la ligne contient une balise <choice>, on la traite
        if (strstr(line, "<choice") != NULL) {
            process_choice_line(line);
        }
    }

    fclose(file); // Fermeture du fichier
}

// Programme principal
int main() {
    const char* filename = "entree.txt";  // Nom du fichier texte à traiter
    convert_choices_to_html(filename);    // Lancement de la conversion
    return 0;
}

