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

void get_idref(const char* line, int* idref) {
    sscanf(line, "<choice idref=\"%d\">", idref);
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

void get_txt(const char* line, char* txt) {
    char* start = strstr(line, "<choice>");
    char* end = strstr(line, "</choice>");
    if (start && end && end > start) {
        start += 8; // avance après <choice>
        int len = end - start;
        strncpy(txt, start, len);
        txt[len] = '\0';
    }
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


void get_titre_chapter(const char* line, char* out_titre_chapter){
    char* start = strstr(line, "<a>");
    char* end = strstr(line, "</a>");
    if (start && end && end > start) {
        start += 3; // avance après <a>
        int len = end - start;
        strncpy(out_titre_chapter, start, len);
        out_titre_chapter[len] = '\0';
    } else {
        out_titre_chapter[0] = '\0';
    }
}