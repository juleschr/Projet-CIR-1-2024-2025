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
    
    bool in_chapter = true;
    
    char line[LINE_SIZE];
    while(fgets(line, sizeof(line), file)){    // verifie si la ligne contient la balise chapter 
        if(strstr("<chapter id",line)){
            int id = 0;
            char title[512];
            sscanf(line,"<chapter id\"%d\">%[^>]s",id,title);
            printf("%d",id);
        }
    }

}

