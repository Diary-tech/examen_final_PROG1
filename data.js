/*
1 - Analyse du problème : 
Entrée : Fichier Docs Data
Sortie : Variable Article contenant chaque article sur le blog 

2 - Conception : 
Mettre le contenu du fichier Docs Data dans une variable appellé "articles" ayant comme
structure de base de données un tableau d'objet. Exporter la variable pour qu'elle soit réutilisable dans
autres fichiers.

3 - Syntaxe : 
Début 
  Déclarer articles : tableau
  Exporter articles
Fin
*/


export const articles = [
  {
    title: "Hello World",
    author: "Alice Dupont",
    date: "2026-01-15",
    content: "Node.js est une technologie très puissante qui permet de créer des applications serveur avec JavaScript.",
    image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoK1v5QAAAABJRU5ErkJggg==" // exemple base64 (remplace par les vrais si fournis)
  },
  {
    title: "Node.js en 2026",
    author: "Bob Martin",
    date: "2026-02-03",
    content: "Apprendre JavaScript facilement reste une des meilleures décisions pour un développeur.",
    image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoK1v5QAAAABJRU5ErkJggg=="
  },
  {
    title: "Les secrets des ESM !",
    author: "Alice Dupont",
    date: "2026-03-10",
    content: "Les modules ESM permettent une meilleure modularisation et une syntaxe moderne en Node.js.",
    image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoK1v5QAAAABJRU5ErkJggg=="
  },
  {
    title: "L'efficacité algorithmique",
    author: "Charlie Chen",
    date: "2026-04-01",
    content: "Penser algorithmiquement est la clé pour écrire du code performant et élégant.",
    image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoK1v5QAAAABJRU5ErkJggg=="
  }
];