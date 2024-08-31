const { v4: uuidv4 } = require('uuid');

// Generate a unique vendor code
const generateVendorCode = () => {
    return `VND-${uuidv4().split('-')[0].toUpperCase()}`;
};

const generatePONumber = () => {
    return `PO-${Date.now().toString().slice(-6)}`; // Last 6 digits of current timestamp
};

module.exports = { generateVendorCode, generatePONumber};
