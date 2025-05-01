const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun } = require('docx');

const inputDir = '../img/originals';
const outputDir = '../img/webp-original-dimensions';
const outputDoc = 'tabla-optimización.docx';

const validExtensions = ['.jpg', '.jpeg', '.png'];

function getFileSizeKB(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const stats = fs.statSync(filePath);
  return +(stats.size / 1024).toFixed(2);
}

function createCell(text) {
  return new TableCell({
    width: { size: 20, type: WidthType.PERCENTAGE },
    children: [new Paragraph({ children: [new TextRun(text.toString())] })],
  });
}

const headers = [
  'Nombre de la imagen',
  'Formato original',
  'Formato optimizado',
  'Peso original (KB)',
  'Peso WebP (KB)',
  'Reducción (%)',
];

const rows = [
  new TableRow({ children: headers.map(createCell) }),
];

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!validExtensions.includes(ext)) return;

  const { name } = path.parse(file);
  const originalPath = path.join(inputDir, file);
  const webpPath = path.join(outputDir, `${name}.webp`);

  const originalSize = getFileSizeKB(originalPath);
  const webpSize = getFileSizeKB(webpPath);

  if (originalSize && webpSize) {
    const reduction = +(((originalSize - webpSize) / originalSize) * 100).toFixed(1);
    const cells = [
      file,
      ext.slice(1).toUpperCase(),
      'WebP',
      originalSize,
      webpSize,
      `${reduction}%`,
    ].map(createCell);

    rows.push(new TableRow({ children: cells }));
  }
});

const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun({ text: 'Optimización de imágenes: comparación JPG vs WebP', bold: true })],
          spacing: { after: 300 },
        }),
        new Table({ rows }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputDoc, buffer);
  console.log(`✅ Documento generado: ${outputDoc}`);
});
