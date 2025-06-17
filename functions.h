#ifndef FUNCTIONS_H
#define FUNCTIONS_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

int is_new_chapter(char *line , char *chapter_id, char *chapter_title);
//void writeIDTitle(char *line);
FILE* start_chapter(char *line);
void end_chapter(FILE* file);
void process_paragraphs(char* line, FILE* chapter_file);
void process_choice_line( char *line , FILE* chapter_file);

//int is_end_of_chapter(char *line);
#endif // FUNCTIONS_H