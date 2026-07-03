const { jsPDF } = require('jspdf');
const doc = new jsPDF();
doc.setFont('helvetica', 'normal');
doc.text('Rupee: ₹', 10, 10);
const uri = doc.output('datauristring');
console.log('URI:', uri.length > 50 ? uri.substring(0, 50) + '...' : uri);
