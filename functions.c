#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"

 // Check if the line contains "Chapter"
int is_new_chapter(char *line ,char* chapter_id , char* chapter_title) {
    if (strstr(line, "<chapter") != NULL){
        sscanf(line, "<chapter id=\"%[^\"]\"> %[^\n]</chapter>", chapter_id, chapter_title);
        return 1;
    }
    return 0;
}



void end_chapter(FILE* file) {
    //printf("End chapter function began\n");
    if (file != NULL) {
        fprintf(file,
            "<div id=\"character-display\"></div>\n"
            "  <hr>\n"
            "  <footer>\n"
            "    <p>&copy; Projet CIR1 – 2024/2025</p>\n"
            "  </footer>\n"
            "</body>\n"
            "</html>\n"
        );
        fclose(file);
        printf("Chapter file closed successfully.\n");
    }
}

FILE* start_chapter( char *line) {
    char chapter_id[50];
    char chapter_title[256];

    //check if the line is a chapter and extract info
    if (!is_new_chapter(line, chapter_id, chapter_title)) {
        return NULL; // Not a chapter, skip
    }

    //create the file name like "ch01.html"
    char filename[64];
    snprintf(filename, sizeof(filename), "export/%s.html", chapter_id);

    //open the file for writing
    FILE *file = fopen(filename, "w");
    if (file == NULL) {
        fprintf(stderr, "Erreur : impossible de créer le fichier %s\n", filename);
        return NULL;
    }

    //write the HTML header
    fprintf(file,
        "<!DOCTYPE html>\n"
        "<html lang=\"fr\">\n"
        "<head>\n"
        "  <meta charset=\"UTF-8\">\n"
        "  <title> %s</title>\n"
        "  <link rel=\"stylesheet\" href=\"../style.css\">\n"
         "  <script src=\"../character.js\"></script>\n"  
         "   <script src=\"../js/combat.js\"></script>\n                                             "
        "</head>\n"
        "<body>\n"
        "<div class=\"book\">\n"
        "  <h1 id=\"id%s\">%s-%s</h1>\n",
        chapter_title, chapter_id, chapter_id, chapter_title
    );
    return file;
}

void process_paragraphs(char* line, FILE* chapter_file) {
    char* start = strstr(line, "<p>");
    char* end = strstr(line, "</p>");
    if (start && end && end > start) {
        start += strlen("<p>");
        char contenu[512];
        size_t len = end - start;
        strncpy(contenu, start, len);
        contenu[len] = '\0';
        fprintf(chapter_file, "<p class=\"paragraph\">%s</p>\n", contenu);
    }
    
}

