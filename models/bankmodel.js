const mongoose = require('mongoose');

// Define the schema for Bank Details
const bankDetailsSchema = new mongoose.Schema({
    accountHolder: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Account holder name must be at least 3 characters long'],
        maxlength: [100, 'Account holder name cannot exceed 100 characters']
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true, // Ensure account number is unique
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{9,18}$/.test(v); // Only allow numbers (9 to 18 digits)
            },
            message: props => `${props.value} is not a valid account number!`
        }
    },
    ifscCode: {
        type: String,
        required: true,
        trim: true,   
         validate: {
            validator: function (v) {
                return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v); // Regex for IFSC Code format
            },
            message: props => `${props.value} is not a valid IFSC code!`
        }

    },
    bankName: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create a model using the schema
const BankDetails = mongoose.model('BankDetails', bankDetailsSchema);

module.exports = BankDetails;
