const { jsPDF } = require('jspdf');
const fs = require('fs');

async function testSVG() {
  const doc = new jsPDF();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="blue" d="M12 2L2 22h20L12 2z"/></svg>`;
  const b64 = Buffer.from(svg).toString('base64');
  try {
    doc.addImage(`data:image/svg+xml;base64,${b64}`, 'SVG', 10, 10, 50, 50);
    doc.output('datauristring');
    console.log('SVG SUCCESS');
  } catch (e) {
    console.log('SVG FAILED:', e.message);
  }
}
testSVG();
