#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define LINE_SIZE 512

void read_chapter(const char* file_name){
    FILE* file = fopen(file_name, "r");
    if(!file){
        perror("error while file's opening");
        return;
    }
    
    char line[LINE_SIZE];
    
    while(fgets(line, sizeof(line), file)){    // ...
        if(strstr("<chapter id",line)){ // verifie si la ligne contient la balise chapter
            int id = 0;
            char title[512];
            sscanf(line,"<chapter id\"%d\">%[^>]s",&id,title); // extrait l'id et le titre de la balise chapter
            printf("%d",id);
            printf("%d")
        }
    }

}

void chapter_htlm(filename){
    /*LALALAND*/
}


main(){
    const char* filename =book.txt;
    read_chapter(filename);
}