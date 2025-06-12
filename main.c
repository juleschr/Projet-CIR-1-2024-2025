#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
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
    if(fgets(line, sizeof(line), file)) {
        printf("Reading the line %s", line);
    }
    
    fclose(file);
    return EXIT_SUCCESS;
}