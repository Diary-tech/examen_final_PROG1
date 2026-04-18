
import fs from 'fs';
import { articles } from './data.js';
import { layout } from './layout.js';
import { slugify, truncate, countWords, escapeHTML } from './stringUtils.js';

const dist = './dist';
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}


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