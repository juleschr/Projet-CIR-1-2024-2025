#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"
#define LINE_SIZE 512

int main() {
   
    FILE* input = fopen("book.txt", "r");
    char line[512];
    char chapter_id[50];
    char chapter_title[256];

    

   while (fgets(line, sizeof(line), input)) {
       
       if (is_new_chapter(line, chapter_id, chapter_title)) {
           FILE *chapter_file = start_chapter(line);
        
           end_chapter(chapter_file);
           printf("LINE: %s\n", line);
       }
   }

    fclose(input);

    return 0;

}