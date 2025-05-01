const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../img/originals';
const outputDir = '../img/optimized';

const validExtensions = ['.jpg', '.jpeg', '.png'];

const baseWidths = [400, 900];
const scales = [1, 2];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!validExtensions.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const { name } = path.parse(file);

  baseWidths.forEach(baseWidth => {
    scales.forEach(scale => {
      const width = baseWidth * scale;
      const outputFile = `${name}-${width}.webp`;
      const outputPath = path.join(outputDir, outputFile);

      sharp(inputPath)
        .resize({ width })
        .toFormat('webp', { quality: 100 })
        .toFile(outputPath)
        .then(() => console.log(`✅ Generada: ${outputFile}`))
        .catch(err => console.error(`❌ Error al procesar ${file}:`, err));
    });
  });
});
