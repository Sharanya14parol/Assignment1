const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logReports = (violations) => {
    const reportPath = path.join(__dirname, '../logs');
    if (!fs.existsSync(reportPath)) fs.mkdirSync(reportPath);

    const filePath = path.join(reportPath, `report_${moment().format('YYYY_MM_DD')}.json`);
    fs.writeFileSync(filePath, JSON.stringify(violations, null, 2));
};

module.exports = { logReports };
