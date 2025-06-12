#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"

 // Check if the line contains "Chapter"
int is_new_chapter(char *line ,char* chapter_id , char* chapter_title) {
    if (strstr(line, "chapter") != NULL){
        sscanf(line, "<chapter id=\"%[^\"]\"> %[^\n]</chapter>", chapter_id, chapter_title);
    }
}


