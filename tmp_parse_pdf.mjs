import fs from 'fs';
import pdfParse from 'pdf-parse';

async function parsePdf() {
  const dataBuffer = fs.readFileSync('public/offer letter.pdf');
  const data = await pdfParse(dataBuffer);
  console.log("PDF TEXT:");
  console.log(data.text);
}

parsePdf();
