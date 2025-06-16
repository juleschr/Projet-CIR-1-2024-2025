#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

//<choice idref="03">Vous dirigez vers l’Est, où un ancien château a été aperçu par les voyageurs. <a>Chapitre 3</a></choice


void lire_choice(const char* filename){
    FILE* file = fopen(filename, "r");
    if(!file){
        perror("error while opening the file ");
    }
    char line[512];

    while (fgets(line, sizeof(line), file)){
        if(strstr("<choice idref",line)){
            char txt[512];
            char titre_chapter[512];
            int idref = 00;
            scanf(line, "<choice idref=\"%d\">%[^<]<a>%[^<]</a></choice>", &idref, txt, titre_chapter);

        }
    }
}


void affichere_idref(int idref, const char* txt, const char* titre_chapter) {
    printf("<choice idref=\"%d\">",idref);
    for (size_t i = 0; txt[i]; ++i) {
        if (txt[i] == '\n') {
            putchar(' ');
        } else {
            putchar(txt[i]);
        }
    }
    printf("<a>%s</a></choice>\n", titre_chapter);
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE 512

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

void get_idref(const char* filename) {
    FILE* file = fopen(filename, "r");
    if (!file) {
        perror("error while opening the file ");
        return;
    }
    char line[512];
    while (fgets(line, sizeof(line), file)) {
        int idref = 0;
        sscanf(line, "<choice idref=\"%d\">", &idref);
        affichere_idref(idref, "", ""); // Affiche juste l'idref 
    }
    fclose(file);
}
    



void afficher_txt(const char* txt) {
    printf("<choice>");
    for (int i = 0; txt[i]; ++i) {
        if (txt[i] == '\n') {
            putchar(' \n');
        } else {
            putchar(txt[i]);
        }
    }
    printf("</choice>\n");
}

void get_txt(const char* filename) {
    char txt[512];
    FILE* file = fopen(filename, "r");
    if (!file) {
        perror("error while opening the file ");
        return;
    }
    char line[512];
    while (fgets(line, sizeof(line), file)) {
        char* start = strchr(line, '>');
        char* a_tag = strstr(line, "<a>");
        if (start && a_tag && a_tag > start) {
            size_t len = a_tag - (start + 1);
            strncpy(txt, start + 1, len);
            txt[len] = '\0';
            afficher_txt(txt);
        }
    }
    fclose(file);
}


void afficher_titre_chapter(const char* titre_chapter){
    printf("<a>");
    for(int i = 0; titre_chapter[i]; i++){
        if(titre_chapter[i] == "\n"){
            putchar(" ");
        } else{
            putchar(titre_chapter[i]);
        }
    }
    printf("</a>");
}


void get_titre_chapter(const char* filename) {

    FILE* file = fopen(filename, "r");
    if (!file) {
        perror("error while opening the file ");
        return;
    }
    char line[512];
    while (fgets(line, sizeof(line), file)) {
        char* start = strstr(line, "<a>");
        char* end = strstr(line, "</a>");
        if (start && end && end > start) {
            start += 3; // avance après <a>
            int len = end - start;
            char titre_chapter[512];
            strncpy(titre_chapter, start, len);
            titre_chapter[len] = '\0';
            afficher_titre_chapter(titre_chapter);
        }
    }
    fclose(file);
}
   

void main(){
    lire_choice("book.txt");
    printf("-----------------------idref-------------------------\n");
    get_idref("book.txt");
    printf("-----------------------titre_chapter-----------------\n");
    get_titre_chapter("book.txt");
    printf("-----------------------txt---------------------------\n");
    get_txt("book.txt");

}
