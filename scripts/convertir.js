const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '../img/originals';    // Carpeta de entrada con imágenes originales
const outputDir = '../img/optimized';   // Carpeta de salida para imágenes .webp

// Extensiones válidas
const validExtensions = ['.jpg', '.jpeg', '.png'];

// Anchos base reales según sizes + sus versiones 2x
const targetWidths = [304, 430, 480, 608, 675, 860, 960, 1350];

// Crear carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Procesar cada imagen
fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!validExtensions.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const { name } = path.parse(file);

  targetWidths.forEach(width => {
    const outputFile = `${name}-${width}.webp`;
    const outputPath = path.join(outputDir, outputFile);

    sharp(inputPath)
      .resize({ width })
      .toFormat('webp', { quality: 90 }) // Calidad óptima
      .toFile(outputPath)
      .then(() => console.log(`✅ Generada: ${outputFile}`))
      .catch(err => console.error(`❌ Error al procesar ${file}:`, err));
  });
});
