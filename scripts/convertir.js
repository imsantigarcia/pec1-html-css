const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../img/originals';
const outputDir = '../img/optimized';

const validExtensions = ['.jpg', '.jpeg', '.png'];
const imageName = 'pastisset-chocolate-receta';
const targetWidths = [304, 400, 800]; // Según srcset y fallback 2x

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  const { name } = path.parse(file);
  if (!validExtensions.includes(ext)) return;
  if (name !== imageName) return;

  const inputPath = path.join(inputDir, file);

  targetWidths.forEach(width => {
    const outputFile = `${imageName}-${width}.webp`;
    const outputPath = path.join(outputDir, outputFile);

    sharp(inputPath)
      .resize({ width })
      .toFormat('webp', { quality: 90 })
      .toFile(outputPath)
      .then(() => console.log(`✅ Generada: ${outputFile}`))
      .catch(err => console.error(`❌ Error al procesar ${file}:`, err));
  });
});
