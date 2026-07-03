const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'actions', 'offer-letter.js');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Fix Info Grid Bounding Box (height from 75 to 90)
content = content.replace(
  `doc.roundedRect(margin, y, contentWidth, 75, 4, 4, "S");`,
  `doc.roundedRect(margin, y, contentWidth, 90, 4, 4, "S");`
);

// Fix Y-axis jump after Info Grid (from 90 to 105)
content = content.replace(
  `y += 90;`,
  `y += 105;`
);

// 2. Fix Roles Overlap (from 65 to 75)
content = content.replace(
  `y += 65;`,
  `y += 75;`
);

// 3. Remove last point from Terms
const oldTerms = `    drawSection('scales', 'TERMS, CONDITIONS & LEGAL CLAUSES', [
      "This internship is primarily learning-focused.",
      "A predefined probation period may apply based on early performance metrics.",
      "Interns must adhere firmly to timelines and maintain organizational discipline.",
      "Notice period: 15 days written intimation before exiting.",
      "Any form of documented misconduct or plagiarism may result in immediate termination.",
      "All technical work and documentation produced is the exclusive intellectual property of TechieHelp."
    ], margin + contentWidth/2 + 5, y);`;

const newTerms = `    drawSection('scales', 'TERMS, CONDITIONS & LEGAL CLAUSES', [
      "This internship is primarily learning-focused.",
      "A predefined probation period may apply based on early performance metrics.",
      "Interns must adhere firmly to timelines and maintain organizational discipline.",
      "Notice period: 15 days written intimation before exiting.",
      "Any form of documented misconduct or plagiarism may result in immediate termination."
    ], margin + contentWidth/2 + 5, y);`;

content = content.replace(oldTerms, newTerms);

// 4. Update Benefits Icons to "Lucide" style (nice checkmark or star instead of blocks)
const oldBenefitsLoop = `      doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.rect(bx - 6, y + 3, 12, 10, "F");
      doc.setFillColor(255, 255, 255);
      doc.rect(bx - 3, y + 6, 6, 4, "F");`;

const newBenefitsLoop = `      // Draw a clean Lucide-style check-circle
      doc.setDrawColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.setLineWidth(1);
      doc.circle(bx, y + 8, 6, "S");
      // Checkmark inside
      doc.setLineWidth(1);
      doc.path([
        {op: 'm', c: [bx - 2, y + 8]},
        {op: 'l', c: [bx, y + 10]},
        {op: 'l', c: [bx + 3, y + 5]}
      ]);
      doc.stroke();`;

content = content.replace(oldBenefitsLoop, newBenefitsLoop);
// Adjust text y positions so they aren't cramped by the checkmark circle (y+23 -> y+23, y+31 -> y+31, just keep same but maybe adjust checkmark)

// 5. Increase Logo Sizes and move them closer to center signature
const oldLogos = `    // Place ISO, MSME and Seal Logos at the right
    const logoY = y + 5;
    if(images.iso) {
      doc.addImage(images.iso, "PNG", rightX - 120, logoY, 40, 40, "", "SLOW");
    }
    if(images.msme) {
      doc.addImage(images.msme, "PNG", rightX - 75, logoY + 5, 45, 30, "", "SLOW");
    }
    if(images.seal) {
      doc.addImage(images.seal, "PNG", rightX - 30, logoY + 5, 35, 35, "", "SLOW");
    }`;

const newLogos = `    // Place ISO, MSME and Seal Logos closer to the signature
    const logoY = y;
    if(images.iso) {
      doc.addImage(images.iso, "PNG", sigX + 65, logoY, 45, 45, "", "SLOW");
    }
    if(images.msme) {
      doc.addImage(images.msme, "PNG", sigX + 120, logoY + 8, 55, 35, "", "SLOW");
    }
    if(images.seal) {
      doc.addImage(images.seal, "PNG", sigX + 185, logoY + 5, 40, 40, "", "SLOW");
    }`;

content = content.replace(oldLogos, newLogos);

// Write back
fs.writeFileSync(targetPath, content, 'utf8');
console.log('Applied final tweaks: college box, overlap fix, terms removal, lucide icons, big logos near sig');
