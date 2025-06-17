#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"
#define LINE_SIZE 512

int main() {
    FILE* input = fopen("book.txt", "r");
    if (input == NULL) {
        perror("Error opening file");
        return 1;
    }
    char line[512];
    char chapter_id[50];
    char chapter_title[256];
    FILE* chapter_file = NULL;

    while (fgets(line, sizeof(line), input)) {
        if (is_new_chapter(line, chapter_id, chapter_title)) {
            chapter_file = start_chapter(line);
        }
        else if (strstr(line, "<endchapter>") != NULL) {
            printf("End of chapter detected: %s\n", chapter_id);
            end_chapter(chapter_file);
            chapter_file = NULL;
        }
        else if (chapter_file != NULL) {
            if (strstr(line, "<p>") != NULL) {
                process_paragraphs(line, chapter_file); // Pass the line directly
            }
            else if (strstr(line, "<choice") != NULL) {
                process_choice_line(line, chapter_file);
            }
        }
    }

    fclose(input);
    return 0;


}