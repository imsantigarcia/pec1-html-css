const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../img/originals';
const outputDir = '../img/optimized';

const validExtensions = ['.jpg', '.jpeg', '.png'];

// Resoluciones necesarias para detalle.html
const targetWidths = [150, 304];

// Solo se procesan estas imágenes
const includedImages = ['paso-1', 'paso-2', 'paso-3', 'paso-4', 'paso-5', 'ingredientes-pastisset'];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  const { name } = path.parse(file);
  if (!validExtensions.includes(ext)) return;
  if (!includedImages.includes(name)) return;

  const inputPath = path.join(inputDir, file);

  targetWidths.forEach(width => {
    const outputFile = `${name}-${width}.webp`;
    const outputPath = path.join(outputDir, outputFile);

    sharp(inputPath)
      .resize({ width })
      .toFormat('webp', { quality: 90 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Generada: ${outputFile}`))
      .catch(err => console.error(`❌ Error al procesar ${file}:`, err));
  });
});
