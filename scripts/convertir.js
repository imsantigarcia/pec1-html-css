const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './img/originals';
const outputDir = './img/optimized';

const sizes = [400, 550, 900, 1200, 1600];

const validExtensions = ['.jpg', '.jpeg', '.png'];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();

  if (!validExtensions.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const { name } = path.parse(file);

  sizes.forEach(size => {
    const outputFile = `${name}-${size}.webp`;
    const outputPath = path.join(outputDir, outputFile);

    sharp(inputPath)
      .resize({ width: size })
      .toFormat('webp', { quality: 100 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Generada: ${outputFile}`))
      .catch(err => console.error(`❌ Error al procesar ${file}:`, err));
  });
});
