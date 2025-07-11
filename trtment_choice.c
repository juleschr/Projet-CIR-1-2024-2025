#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "functions.h"
#define MAX_LINE 1024

void process_choice_line(char *line, FILE *chapter_file) {
    char idref[20];
    char texte[512];
    char chapitre[100];
    char gain[50] = "";
    int healthChange = 0;
    int lifeChange = 0;
    char combatResult[20] = "none";

    // Extract idref
    const char *id_start = strstr(line, "idref=\"");
    if (!id_start) return;
    id_start += 7;
    const char *id_end = strchr(id_start, '"');
    if (!id_end) return;
    strncpy(idref, id_start, id_end - id_start);
    idref[id_end - id_start] = '\0';

    // Extract gain if present
    const char *gain_start = strstr(line, "gain=\"");
    if (gain_start) {
        gain_start += 6;
        const char *gain_end = strchr(gain_start, '"');
        if (gain_end) {
            strncpy(gain, gain_start, gain_end - gain_start);
            gain[gain_end - gain_start] = '\0';
        }
    }

    // Extract health if present
    const char *health_start = strstr(line, "health=\"");
    if (health_start) {
        health_start += 8;
        healthChange = atoi(health_start);
    }

    //Extract life if present
    const char *life_start = strstr(line, "life=\"");
    if (life_start) {
        life_start += 6;
        lifeChange = atoi(life_start);
    }

   

    // Extract display text (between > and <a>)
    const char *text_start = strchr(line, '>');
    if (!text_start) return;
    text_start++;
    const char *a_start = strstr(text_start, "<a>");
    if (!a_start) return;
    strncpy(texte, text_start, a_start - text_start);
    texte[a_start - text_start] = '\0';

    //Extract chapter display (inside <a> tag)
    const char *chap_start = a_start + 3;
    const char *chap_end = strstr(chap_start, "</a>");
    if (!chap_end) return;
    strncpy(chapitre, chap_start, chap_end - chap_start);
    chapitre[chap_end - chap_start] = '\0';

    //extract combat status (default to false if not present)
    char combat[20] = "false";
    const char *combat_start = strstr(line, "combat=\"");
    if (combat_start) {
    combat_start += 8;
    const char *combat_end = strchr(combat_start, '"');
    if (combat_end) {
        strncpy(combat, combat_start, combat_end - combat_start);
        combat[combat_end - combat_start] = '\0';
    }
}

    //Writing the final button into HTML
    fprintf(chapter_file,
    "<button id=\"choice-%s\" data-gain=\"%s\" data-health=\"%d\" data-life=\"%d\" data-combat=\"%s\" data-idref=\"%s\">"
    "%s</button>\n",
    idref, gain, healthChange, lifeChange, combat, idref, texte);


}