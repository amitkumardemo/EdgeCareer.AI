const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'actions', 'offer-letter.js');
const scratchPath = path.join(__dirname, 'scratch-pdf-replacement-2.js');

let content = fs.readFileSync(targetPath, 'utf8');
const replacement = fs.readFileSync(scratchPath, 'utf8');

const startMarker = '    // 3. Generate PDF with jsPDF';
const endMarker = '    // 5. Upsert DB record with data URL';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = content.substring(0, startIndex) + replacement + "\n\n" + content.substring(endIndex);
  fs.writeFileSync(targetPath, newContent, 'utf8');
  console.log('Successfully replaced PDF generation logic with 1-page exact layout.');
} else {
  console.log('Failed to find markers.');
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
}
