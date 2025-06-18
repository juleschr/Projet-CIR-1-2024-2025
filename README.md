                                ________      .__       .__           .__         
                                /  _____/______|__| ____ |  |__   ____ |__| _____  
                                /   \  __\_  __ \  |/    \|  |  \_/ __ \|  |/     \ 
                                \    \_\  \  | \/  |   |  \   Y  \  ___/|  |  Y Y  \
                                \______  /__|  |__|___|  /___|  /\___  >__|__|_|  /
                                        \/              \/     \/     \/         \/ 


# Un livre dont vous etes le heros 

# Présentation du Projet

Ce projet consiste à concevoir un moteur d’interprétation et de génération de pages HTML interactives à partir d’un fichier source contenant un livre-jeu. L'utilisateur peut naviguer dans l’histoire en faisant des choix, influençant le déroulement du récit. Il s'agit donc d'un livre interactif, inspiré du concept classique des "Livres dont vous êtes le héros".


# Fonctionnalités Principales

Lecture et traitement du livre source
Le programme lit un fichier book.txt contenant l’intégralité de l’histoire structurée avec des balises spécifiques (<chapter>, <p><choice>, etc.).
Chaque chapitre est identifié et traité séparément.

# Détection des chapitres

Détection automatique des débuts de chapitres grâce à la fonction is_new_chapter.
Extraction de l’identifiant et du titre du chapitre pour générer des fichiers distincts.
# Génération des fichiers HTML

Pour chaque chapitre, un fichier HTML est généré dans le dossier export/, nommé chXX.html (où XX est l’identifiant du chapitre).
Les fichiers incluent une structure HTML complète (en-tête, contenu, pied de page).

#Traitement du contenu

Les paragraphes (<p>) sont extraits et affichés dans un bloc avec style CSS.
Les choix (<choice>) sont transformés en liens permettant de naviguer vers d’autres chapitres.
Les métadonnées (points de vie, objets, gains) peuvent être prises en compte pour enrichir l’interactivité.

# Intégration de scripts

Intégration de fichiers JavaScript comme character.js et combat.js pour gérer les éléments dynamiques (inventaire, combats, état du joueur).
Le style est unifié via un fichier style.css commun à tous les chapitres.

# Fichiers Principaux


├── book.txt                 
├── export/                
├── style.css              
├── js/
│   ├── character.js      
│   └── combat.js           
└── README.md               

# compilation

Compiler grâce au Makefile vec :
make

Puis exécuter :
./main


Pré-requis :

Le fichier book.txt est dans le répertoire courant.

Le dossier export/ existe.

Les fichiers style.css, character.js, et combat.js sont accessibles via les chemins définis dans le HTML généré.

