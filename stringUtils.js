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