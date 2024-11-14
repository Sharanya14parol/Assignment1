// const fs = require('fs');
// const path = require('path');

// const generateInvoice = (violation) => {
//     const invoicePath = path.join(__dirname, '../invoices');
//     if (!fs.existsSync(invoicePath)) fs.mkdirSync(invoicePath);

//     const filePath = path.join(invoicePath, `invoice_${violation.id}.txt`);
//     const content = `Invoice for Violation ID: ${violation.id}\nType: ${violation.type}\nFine: $${violation.fine}\nDate: ${new Date().toLocaleString()}`;
//     fs.writeFileSync(filePath, content);
// };

// module.exports = { generateInvoice };

const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    priority: { type: Number, required: true },  // 1 for most serious (accidents), higher numbers for less severe violations
    fine: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Violation = mongoose.model('Violation', violationSchema);

const generateInvoice = (violation) => {
    const fs = require('fs');
    const path = require('path');
    const invoicePath = path.join(__dirname, '../invoices');
    if (!fs.existsSync(invoicePath)) fs.mkdirSync(invoicePath);

    const filePath = path.join(invoicePath, `invoice_${violation.id}.txt`);
    const content = `Invoice for Violation ID: ${violation.id}\nType: ${violation.type}\nFine: $${violation.fine}\nDate: ${new Date().toLocaleString()}`;
    fs.writeFileSync(filePath, content);
};

module.exports = { Violation, generateInvoice };
