const { jsPDF } = require('jspdf');
const doc = new jsPDF();
doc.text('Hello world!', 10, 10);
const uri = doc.output('datauristring');
console.log('URI starts with:', uri ? uri.substring(0, 30) : uri);
console.log('Length:', uri ? uri.length : 0);
