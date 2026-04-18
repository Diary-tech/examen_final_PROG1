import fs from 'fs';

/**
 * Encode une image en Base64
 * @param {string} imagePath - Chemin vers l'image
 * @returns {string} Chaîne Base64
 */
export function encodeImageToBase64(imagePath) {
  const bitmap = fs.readFileSync(imagePath);
  return bitmap.toString('base64');
}

/**
 * Décode une chaîne Base64 et sauvegarde l'image
 * @param {string} base64String - Chaîne Base64 (sans le préfixe data:...)
 * @param {string} outputPath - Chemin de sortie de l'image
 */
export function decodeBase64ToImage(base64String, outputPath) {
  const buffer = Buffer.from(base64String, 'base64');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Image sauvegardée : ${outputPath}`);
}