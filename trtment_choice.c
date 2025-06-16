#include <stdio.h> 
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

//<choice idref="03">Vous dirigez vers l’Est, où un ancien château a été aperçu par les voyageurs. <a>Chapitre 3</a></choice>


#include <stdio.h>
#include <string.h>

int main() {
    // Contenu XML d'entrée
    const char *id = "03";
    const char *title = "Le furie nocturne";
    const char *para1 = "Harold arrive dans la clairière et découvre un dragon.";
    const char *para2 = "Il s'agit d'un furie nocturne visiblement blessé.";
    const char *choice1_text = "S'approcher de Krokmou";
    const char *choice1_href = "04";
    const char *choice2_text = "S'enfuir en courant";
    const char *choice2_href = "05";

    // Génération du HTML
    printf("<h1>%s</h1>\n", title);
    printf("<p>%s</p>\n", para1);
    printf("<p>%s</p>\n", para2);
    printf("<p>%s <a href=\"%s.html\">Chapitre %s</a></p>\n", choice1_text, choice1_href, choice1_href);
    printf("<p>%s <a href=\"%s.html\">Chapitre %s</a></p>\n", choice2_text, choice2_href, choice2_href);

    return 0;
}
