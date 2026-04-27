import fs from 'fs';
import { articles } from './data.js';
import { layout } from './layout.js';
import { slugify, truncate, countWords, escapeHTML } from './stringUtils.js';

const dist = './dist';
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}

/*
Fonction generatesStatsPage : 
1 - Analyse :
Entrée : tableau d’articles
Sortie : Page HTML contenant les statistiques du blog

2 - Conception : 
Utiliser une fonction generateStatsPage qui prend en paramètre un tableau d’articles. Calculer le nombre
d’articles avec la longueur du tableau. Utiliser une boucle pour additionner le nombre 
total de mots avec countWords. Utiliser une structure conditionnelle pour calculer la moyenne si le nombre d’articles > 0.
Utiliser un dictionnaire pour compter le nombre d’articles par auteur.
Parcourir ce dictionnaire pour trouver l’auteur ayant le maximum d’articles. Construire le contenu HTML 
avec les statistiques. Retourner le résultat avec layout.

3 - Syntaxe : 
Début
  Fonction generateStatsPage (data)
    nbrArticles = longueur(data)
        totalWords = 0
        Pour chaque article dans data
            totalWords = totalWords + countWords(article.content)
        FinPour
        Si nbrArticles > 0 Alors
            avgWords = arrondi(totalWords / nbrArticles)
        Sinon
            avgWords = 0
        FinSi
        Déclarer authorCount comme dictionnaire
        Pour chaque article dans data
            authorCount[article.author] = authorCount[article.author] + 1 (ou 1 si inexistant)
        FinPour
        topAuthor = "Aucun"
        maxCount = 0
        Pour chaque auteur dans authorCount
            Si authorCount[auteur] > maxCount Alors
                maxCount = authorCount[auteur]
                topAuthor = auteur
            FinSi
        FinPour
        Construire body (HTML)
        Retourner layout("Statistiques", body)
  FinFonction
Fin
*/

function generateStatsPage(data) {
  const nbrArticles = data.length;

  const totalWords = data.reduce((sum, article) => {
    return sum + countWords(article.content);
  }, 0);

  const avgWords = nbrArticles > 0 ? Math.round(totalWords / nbrArticles) : 0;

  
  const authorCount = {};
  data.forEach(article => {
    authorCount[article.author] = (authorCount[article.author] || 0) + 1;
  });
  let topAuthor = "Aucun";
  let maxCount = 0;
  for (const [author, count] of Object.entries(authorCount)) {
    if (count > maxCount) {
      maxCount = count;
      topAuthor = author;
    }
  }

  const body = `
    <h1>Analyse du Blog</h1>
    <div class="stats-box">
      <div class="stat-item"><strong>${nbrArticles}</strong><br>Articles</div>
      <div class="stat-item"><strong>${totalWords}</strong><br>Mots au total</div>
      <div class="stat-item"><strong>${avgWords}</strong><br>Mots / article</div>
      <div class="stat-item"><strong>${topAuthor}</strong><br>Auteur principal</div>
    </div>
  `;

  return layout("Statistiques", body);
}

/*
Fonction generatesArchivesPages
1 - Analyse :
Entrée : tableau d’articles
Sortie : Page HTML contenant la liste des articles avec liens

2 - Conception : 
Utiliser une fonction generateStatsPage qui prend un tableau d’articles. Parcourir chaque article 
pour créer un élément HTML. Utiliser slugify pour le lien et escapeHTML pour sécuriser le texte.
Utiliser countWords pour afficher le nombre de mots. Concaténer tous les éléments dans une liste.
Retourner la page avec layout.

3 - Syntaxe : 
Début
  Fonction generateArchivesPage (data)
        list = ""
        Pour chaque article dans data
            element = créer HTML avec :
                article.date
                slugify(article.title)
                escapeHTML(article.title)
                countWords(article.content)
            list = list + element
        FinPour
        body = "<h1>Tous les articles</h1>" + list
        Retourner layout("Archives", body)
    FinFonction
Fin
*/

function generateArchivesPage(data) {
  const list = data.map(article => `
    <li>
      <strong>${article.date}</strong> :
      <a href="${slugify(article.title)}.html">${escapeHTML(article.title)}</a>
      (${countWords(article.content)} mots)
    </li>
  `).join('');

  return layout("Archives", `<h1>Tous les articles</h1><ul>${list}</ul>`);
}

/*
Fonction build : 
1 - Analyse :
Entrée : aucune (utilise les données globales)
Sortie : Fichiers HTML générés dans le dossier dist

2 - Conception : 
Utiliser une fonction. Construire la page d’accueil avec les articles (titre, résumé, lien).
Écrire le fichier index.html. Générer et écrire la page archives. Générer et écrire 
la page statistiques. Créer la page à propos. Parcourir les articles pour générer une page 
individuelle pour chacun. Sauvegarder chaque fichier avec fs.writeFileSync.
Afficher un message de succès.

3 - Syntaxe : 
Début
  Fonction build ()
        indexBody = "<h1>Dernières publications</h1>"
        Pour chaque article dans articles
            Ajouter au indexBody :
                titre
                contenu tronqué (truncate)
                lien (slugify)
        FinPour
        Écrire fichier "index.html" avec layout("Accueil", indexBody)
        Écrire fichier "archives.html" avec generateArchivesPage(articles)
        Écrire fichier "stats.html" avec generateStatsPage(articles)
        Écrire fichier "a-propos.html" avec contenu fixe
        Pour chaque article dans articles
            content = construire HTML avec :
                image
                titre sécurisé
                auteur
                date
                contenu
            Écrire fichier avec nom slugify(article.title)
        FinPour
        Afficher "Site généré avec succès"
    FinFonction
Fin
*/

export const build = () => {
  
  const indexBody = `<h1>Dernières publications</h1>` + articles.map(a => `
    <div class="card">
      <h2>${escapeHTML(a.title)}</h2>
      <p>${truncate(a.content, 100)}</p>
      <a href="${slugify(a.title)}.html">Lire l'article</a>
    </div>
  `).join('');

  fs.writeFileSync(`${dist}/index.html`, layout("Accueil", indexBody));

  
  fs.writeFileSync(`${dist}/archives.html`, generateArchivesPage(articles));

  
  fs.writeFileSync(`${dist}/stats.html`, generateStatsPage(articles));

  
  fs.writeFileSync(`${dist}/a-propos.html`, layout("À Propos", 
    `<h1>À propos</h1><p>Ce projet démontre un des potentiels utilisation de Node.js. Finalement, la limite restera toujours votre créativité et imagination. Cela dit, il faut Penser, Travailler et Impacter ! </p>`
  ));

  articles.forEach(art => {
    const content = `
      <img src="data:image/png;base64,${art.image}" style="width:100%; border-radius:8px;">
      <h1>${escapeHTML(art.title)}</h1>
      <p><em>Par ${art.author} le ${art.date}</em></p>
      <div style="background: white; padding: 20px; border-radius: 8px;">${art.content}</div>
    `;
    fs.writeFileSync(`${dist}/${slugify(art.title)}.html`, layout(art.title, content));
  });

  console.log("✨ Site web statique généré avec succès dans le répertoire /dist !");
};