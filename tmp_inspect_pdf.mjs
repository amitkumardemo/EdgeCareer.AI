import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function checkPdf() {
  try {
    const pdfBytes = fs.readFileSync('public/offer letter.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    console.log(`Found ${fields.length} form fields!`);
    fields.forEach(field => {
      console.log(`- ${field.getName()}: ${field.constructor.name}`);
    });
  } catch (error) {
    console.error('Error inspecting PDF:', error);
  }
}

checkPdf();
