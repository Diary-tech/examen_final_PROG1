/* Conception: Fonction encodeImageToBase64 qui prend une image en paramètre et la transforme en chaîne Base64  en créant un buffer, puis retourne ce buffer en tant que string base64

Pseudo-code:
DEBUT

Importer fs
Déclarer imagePath: string

Fonction encodeImageToBase64(imagePath) 
    Déclarer imageBuffer = Lecture de l'image à imagePath
    Retourner imageBuffer sous base64
FIN

*/

import fs from 'fs';

function encodeImageToBase64(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString('base64');
}

/* Conception: Fonction decodeBase64ToImage qui récupère la chaîne base64 et recrée une copie de l'image à oartir d'un buffer

Pseudo-code:
DEBUT

Déclarer base64String: string
Déclarer newPath: string

Fonction decodeBase64ToImage(base64String, nexPath)
    Déclarer imageBuffer
    ImageBuffer = buffer de base64String
    Ecrire l'image vers newPath à partir de imageBuffer
FIN

*/

function decodeBase64ToImage(base64String, newPath) {
    const imageBuffer = Buffer.from(base64String, 'base64');
    fs.writeFileSync(newPath, imageBuffer);
}

export {
    encodeImageToBase64,
    decodeBase64ToImage
};