#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

//<choice idref="03">Vous dirigez vers l’Est, où un ancien château a été aperçu par les voyageurs. <a>Chapitre 3</a></choice>


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
            putchar(' ');
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
            size_t len = end - start;
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
