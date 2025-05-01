const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../img/originals';
const outputDir = '../img/webp-original-dimensions';

const validExtensions = ['.jpg', '.jpeg', '.png'];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!validExtensions.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const { name } = path.parse(file);
  const outputFile = `${name}.webp`;
  const outputPath = path.join(outputDir, outputFile);

  sharp(inputPath)
    .toFormat('webp', { quality: 100 }) // sin resize → 1:1
    .toFile(outputPath)
    .then(() => console.log(`✅ Convertido: ${outputFile}`))
    .catch(err => console.error(`❌ Error al convertir ${file}:`, err));
});
