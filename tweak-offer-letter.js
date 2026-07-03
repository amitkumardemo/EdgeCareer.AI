const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'actions', 'offer-letter.js');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Fetch the 2 extra images
const fetchImagesOld = `    const imagesData = await Promise.all([
      getStaticBase64(path.join(process.cwd(), "public", "thp logo.png")),
      getStaticBase64(path.join(process.cwd(), "public", "EdgeCareers.png")),
      getStaticBase64(path.join(process.cwd(), "public", "seal.png")),
    ]);

    const images = {
      logo: imagesData[0],
      signature: imagesData[1],
      seal: imagesData[2],
    };`;
    
const fetchImagesNew = `    const imagesData = await Promise.all([
      getStaticBase64(path.join(process.cwd(), "public", "thp logo.png")),
      getStaticBase64(path.join(process.cwd(), "public", "EdgeCareers.png")),
      getStaticBase64(path.join(process.cwd(), "public", "seal.png")),
      getStaticBase64(path.join(process.cwd(), "public", "image (3).png")), // ISO
      getStaticBase64(path.join(process.cwd(), "public", "image (4).png")), // MSME
    ]);

    const images = {
      logo: imagesData[0],
      signature: imagesData[1],
      seal: imagesData[2],
      iso: imagesData[3],
      msme: imagesData[4],
    };`;
content = content.replace(fetchImagesOld, fetchImagesNew);

// 2. Remove Title Star and Add Line
const titleStarOld = `    doc.text(title, pageWidth / 2, 140, { align: "center" });
    drawIcon('star', pageWidth / 2, 148, 0, colors.gold);`;
const titleStarNew = `    doc.text(title, pageWidth / 2, 140, { align: "center" });
    doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
    doc.setLineWidth(1.5);
    doc.line(pageWidth / 2 - 80, 145, pageWidth / 2 + 80, 145);`;
content = content.replace(titleStarOld, titleStarNew);

// 3. Fix spacing overlap
const spacingOld1 = `    ], margin + contentWidth/2 + 5, y);\n\n    y += 65;`;
const spacingNew1 = `    ], margin + contentWidth/2 + 5, y);\n\n    y += 85;`;
content = content.replace(spacingOld1, spacingNew1);

const spacingOld2 = `    ], margin + contentWidth/2 + 5, y);\n\n    y += 75;`;
const spacingNew2 = `    ], margin + contentWidth/2 + 5, y);\n\n    y += 85;`;
content = content.replace(spacingOld2, spacingNew2);

// 4 & 5. Improve founder section, move seal, remove scanner, add ISO/MSME
const footerOld = `    // Signature Center
    if (images.signature) {
      doc.addImage(images.signature, "PNG", pageWidth/2 - 40, y - 10, 60, 30, "", "SLOW");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Amit Kumar", pageWidth/2, y + 25, {align:"center"});
    doc.setFontSize(7.5);
    doc.text("Founder & CEO", pageWidth/2, y + 35, {align:"center"});
    doc.text("TechieHelp Institute of AI", pageWidth/2, y + 45, {align:"center"});

    // QR Code Right
    if(images.seal) {
      doc.addImage(images.seal, "PNG", rightX - 110, y - 5, 30, 30, "", "SLOW");
    } else {
      doc.setDrawColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.rect(rightX - 110, y - 5, 30, 30, "S"); // QR placeholder
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("Scan to verify this letter", rightX - 75, y);
    doc.setFont("helvetica", "normal");
    doc.text("or visit our website", rightX - 75, y + 10);
    doc.setTextColor(colors.navy[0], colors.navy[1], colors.navy[2]);
    doc.text("techiehelpinstituteofai.in/verify", rightX - 75, y + 20);`;

const footerNew = `    // Signature Area
    const sigX = margin + 180;
    if (images.signature) {
      doc.addImage(images.signature, "PNG", sigX - 30, y - 15, 60, 30, "", "SLOW");
    }
    
    // Founder Name and Line
    doc.setDrawColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.setLineWidth(0.5);
    doc.line(sigX - 45, y + 15, sigX + 45, y + 15);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Er. Amit Kumar", sigX, y + 26, {align:"center"});
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text("Founder & CEO", sigX, y + 36, {align:"center"});
    doc.text("TechieHelp Institute of AI", sigX, y + 46, {align:"center"});

    // Place ISO and MSME Logos at the right
    const logoY = y - 10;
    if(images.iso) {
      doc.addImage(images.iso, "PNG", rightX - 140, logoY, 40, 40, "", "SLOW");
    }
    if(images.msme) {
      doc.addImage(images.msme, "PNG", rightX - 90, logoY + 5, 45, 30, "", "SLOW");
    }

    // Place Seal
    if(images.seal) {
      doc.addImage(images.seal, "PNG", rightX - 35, logoY + 5, 35, 35, "", "SLOW");
    }`;
content = content.replace(footerOld, footerNew);

// Adjust benefit margin since we pushed y down
const benefitOld = `doc.roundedRect(margin, y, contentWidth, 45, 4, 4, "FD");`;
const benefitNew = `doc.roundedRect(margin, y - 5, contentWidth, 45, 4, 4, "FD");`;
content = content.replace(benefitOld, benefitNew);

const benefitTitleOld = `doc.text("BENEFITS", margin + 12, y + 30);`;
const benefitTitleNew = `doc.text("BENEFITS", margin + 12, y + 25);`;
content = content.replace(benefitTitleOld, benefitTitleNew);

const benefitStarOld = `drawIcon('star', margin + 25, y + 15, 0, colors.gold);`;
const benefitStarNew = `drawIcon('star', margin + 25, y + 10, 0, colors.gold);`;
content = content.replace(benefitStarOld, benefitStarNew);

const benefitLineOld = `doc.line(margin + 50, y + 5, margin + 50, y + 40);`;
const benefitLineNew = `doc.line(margin + 50, y, margin + 50, y + 35);`;
content = content.replace(benefitLineOld, benefitLineNew);

// The benefit item loop needs adjusting by -5
const benefitItemLoopOld = `    for(let i=0; i<benefits.length; i++){
      const bx = margin + 55 + (i * bStep) + (bStep/2);
      // tiny generic square icon placeholder for benefits
      doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.rect(bx - 6, y + 8, 12, 10, "F");
      doc.setFillColor(255, 255, 255);
      doc.rect(bx - 3, y + 11, 6, 4, "F");
      
      doc.text(benefits[i][0], bx, y + 28, {align:"center"});
      doc.text(benefits[i][1], bx, y + 36, {align:"center"});
      
      if(i < benefits.length - 1) {
        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.line(margin + 55 + ((i+1)*bStep), y + 10, margin + 55 + ((i+1)*bStep), y + 35);
      }
    }`;

const benefitItemLoopNew = `    for(let i=0; i<benefits.length; i++){
      const bx = margin + 55 + (i * bStep) + (bStep/2);
      // tiny generic square icon placeholder for benefits
      doc.setFillColor(colors.navy[0], colors.navy[1], colors.navy[2]);
      doc.rect(bx - 6, y + 3, 12, 10, "F");
      doc.setFillColor(255, 255, 255);
      doc.rect(bx - 3, y + 6, 6, 4, "F");
      
      doc.text(benefits[i][0], bx, y + 23, {align:"center"});
      doc.text(benefits[i][1], bx, y + 31, {align:"center"});
      
      if(i < benefits.length - 1) {
        doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
        doc.line(margin + 55 + ((i+1)*bStep), y + 5, margin + 55 + ((i+1)*bStep), y + 30);
      }
    }`;
content = content.replace(benefitItemLoopOld, benefitItemLoopNew);

// Make sure y adjustment after benefits is smaller to save space since we added 40px above
const yAfterBenefitOld = `y += 55;`;
const yAfterBenefitNew = `y += 45;`;
content = content.replace(yAfterBenefitOld, yAfterBenefitNew);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Applied design tweaks to offer-letter.js');
