#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"
#define LINE_SIZE 512

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return EXIT_FAILURE;
    }

    const char *filename = argv[1];
    FILE *file = fopen(filename, "r");
    if (!file) {
        perror("Failed to read file");
        return EXIT_FAILURE;
    }

    char line[LINE_SIZE];
    while(fgets(line, sizeof(line), file)) {
        //printf("Reading the line %s", line);

        char chapter_id[100];
        char chapter_title[100];
        int p = is_new_chapter(line ,chapter_id, chapter_title);
        if (p) {
            printf("New chapter detected: %s", line);
            printf("Chapter ID: %s\n", chapter_id);
            printf("Chapter Title: %s\n", chapter_title);
        }
    }
    
    fclose(file);
    return EXIT_SUCCESS;
}