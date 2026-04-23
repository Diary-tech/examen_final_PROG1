/*
Fonction slugify : 
1 - Analyse du problème : 
Entrée : titre
Sortie : slug ou chaîne de caractère adapté à une URL

2 - Conception : 
Utiliser une fonction slugify qui prend en paramètre titre. 
Puis stocker dans une variable resultat, la chaine de caractère et remplacer une partie du chaine. 
Utiliser une structure conditionnelle pour voir si resultat commence ou se termine par un 
tiret, s'il commence par un tiret, extraire une partie de la chaine de caractère à partir de l'index 1 jusqu'à la fin.
S'il se termine par un tiret, retirer la dernière caractère de la chaine de caractère.

3 - Syntaxe : 
Début
    Fonction slugify (titre)
        Déclarer resultat
        Si resultat commence par - Alors
            resultat = chaine de caractère à partir de l'index 1 jusqu'à la fin
        FinSi
        Si resultat se termine par - Alors
             resultat = chaine de caractère sans la dernière caractère
        FinSi
        Retourner resultat
    FinFonction
Fin
*/

export function slugify(titre) {
    let resultat = titre.toLowerCase();    
    resultat = resultat.trim();             
    resultat = resultat.replace("!", "");
    resultat = resultat.replace("?", "");
    resultat = resultat.replace(".", "");
    resultat = resultat.replace(",", "");
    resultat = resultat.replace(":", "");
    resultat = resultat.replace(";", "");
    resultat = resultat.replace("'", "");
    resultat = resultat.replace('"', "");
    resultat = resultat.replace(" ", "-");
    resultat = resultat.replace("  ", "-");   
    
    if (resultat.startsWith("-")) {
        resultat = resultat.substring(1);
    }
    if (resultat.endsWith("-")) {
        resultat = resultat.substring(0, resultat.length - 1);
    }
    return resultat;
}

/*
Fonction truncate : 
1 - Analyse du problème : 
Entrée : chaine de caractère et longueur maximale autorisé
Sortie : chaîne de caractère raccourci à une longueur donnée

2 - Conception : 
Utiliser une fonction truncate qui prend en paramètre chaine de caractère à tronquér et longueur max autorisé.  
Utiliser une structure conditionnelle pour retourner texte si la longueur de texte <= longueur maximale. Stocker
dans une variable texteCoupe le début de la chaine jusqu'à la longueur donnée. Stocker dans une variable dernierEspace
la dernière position d'une espace " " dans la chaine texteCoupe. Puis utiliser une structure conditionelle pour 
extraire le début de la chaine texteCoupe depuis l'index 0 jusqu'à la position stockée dans dernierEspace si 
dernierEspace > 0.

3 - Syntaxe : 
Début
    Fonction truncate (texte, longueurMax) 
        Si longueue de texte <= longueurMax Alors
            Retourner texte
        FinSi
        Déclarer texteCoupe
        Déclarer dernierEspace
        Si dernierEspace > 0 Alors
            texteCoupe = texteCoupe.substring(0, dernierEspace)
        FinSi
        Retourner texteCoupe
    FinFonction
Fin
*/

export function truncate(texte, longueurMax) {
    if (texte.length <= longueurMax) {
        return texte;
    }

    let texteCoupe = texte.substring(0, longueurMax);
    let dernierEspace = texteCoupe.lastIndexOf(" ");

    if (dernierEspace > 0) {
        texteCoupe = texteCoupe.substring(0, dernierEspace);
    }

    return texteCoupe + "...";
}

export function countWords(str) {
    let texte = str.trim();           
    let mots = texte.split(" ");      
    return mots.length;
}

export function escapeHTML(str) {
    let resultat = str;

    resultat = resultat.replace("&", "&amp;");
    resultat = resultat.replace("<", "&lt;");
    resultat = resultat.replace(">", "&gt;");
    resultat = resultat.replace('"', "&quot;");
    resultat = resultat.replace("'", "&#39;");

    return resultat;
}