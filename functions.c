#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"

 // Check if the line contains "Chapter"
int is_new_chapter(char *line ,char* chapter_id , char* chapter_title) {
    if (strstr(line, "chapter") != NULL){
        sscanf(line, "<chapter id=\"%[^\"]\"> %[^\n]</chapter>", chapter_id, chapter_title);
        return 1;
    }
    return 0;
}




void end_chapter(FILE* file) {
    //printf("End chapter function began\n");
    if (file != NULL) {
        fprintf(file,
            "  <hr>\n"
            "  <footer>\n"
            "    <p>&copy; Projet CIR1 – 2024/2025</p>\n"
            "  </footer>\n"
            "</body>\n"
            "</html>\n"
        );
        fclose(file);
        //printf("Chapter file closed successfully.\n");
    }
}
/*
FILE* start_chapter(const char* chapter_id, const char* chapter_title) {
    printf("Start chapter function began\n");
    // Crée le nom du fichier ex: "01.html"
    char filename[64];
    printf("%s\n", chapter_id);
    snprintf(filename, sizeof(filename), "%s.html", chapter_id);

    //Ouvre le fichier en écriture
    FILE* file = fopen(filename, "w");
    if (file == NULL) {
        fprintf(stderr, "Erreur : impossible de créer le fichier %s\n", filename);
        exit(EXIT_FAILURE);
    }

    //ecrit l'en-tête HTML standard avec un lien CSS
    fprintf(file,
        "<!DOCTYPE html>\n"
        "<html lang=\"fr\">\n"
        "<head>\n"
        "  <meta charset=\"UTF-8\">\n"
        "  <title>%s</title>\n"
        "  <link rel=\"stylesheet\" href=\"style.css\">\n"
        "</head>\n"
        "<body>\n"
        "  <h1>%s</h1>\n",
        chapter_title, chapter_title
    );
    //printf("Chapter file %s created successfully.\n", filename);

    return file;
}
void writeIDTitle(char *line) {
    char chapter_id[50];
    char chapter_title[256];

    // Check if the line is a chapter
    if (is_new_chapter(line, chapter_id, chapter_title)) {
        
        FILE *file = fopen(chapter_title, "a");
        if (file == NULL) {
            perror("Failed to open file");
            return;
        }

        // Write in HTML-like format
        fprintf(file, "<h1><a href=\"#%s\">%s</a></h1>\n", chapter_id, chapter_title);
        fclose(file);
    }
}*/
FILE* start_chapter( char *line) {
    char chapter_id[50];
    char chapter_title[256];

    // Check if the line is a chapter and extract info
    if (!is_new_chapter(line, chapter_id, chapter_title)) {
        return NULL; // Not a chapter, skip
    }

    // Create the file name like "ch01.html"
    char filename[64];
    snprintf(filename, sizeof(filename), "%s.html", chapter_id);

    // Open the file for writing
    FILE *file = fopen(filename, "w");
    if (file == NULL) {
        fprintf(stderr, "Erreur : impossible de créer le fichier %s\n", filename);
        return NULL;
    }

    // Write the HTML header
    fprintf(file,
        "<!DOCTYPE html>\n"
        "<html lang=\"fr\">\n"
        "<head>\n"
        "  <meta charset=\"UTF-8\">\n"
        "  <title>%s</title>\n"
        "  <link rel=\"stylesheet\" href=\"style.css\">\n"
        "</head>\n"
        "<body>\n"
        "  <h1 id=\"%s\">%s</h1>\n",
        chapter_title, chapter_id, chapter_title
    );
/*
    // Optional: also append to a table of contents
    FILE *toc = fopen("book.html", "a");
    if (toc) {
        fprintf(toc, "<h2><a href=\"%s\">%s</a></h2>\n", filename, chapter_title);
        fclose(toc);
    }*/

    return file;
}



