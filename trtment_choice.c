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


void afficher_txt(const char){}