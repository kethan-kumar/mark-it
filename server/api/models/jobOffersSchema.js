const mongoose = require('mongoose');
const schema = mongoose.Schema;

const registrationSchema = new mongoose.Schema(
    {
        jobPosition: {
            type: String,
            required: true
        },
        applicantEmail: {
            type: String,
            required: true
        },
        hirerId: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        status:{
            type: String,
            required: true
        }
    }, { timestamps: true }
);

const registration = mongoose.model('joboffer', registrationSchema);

module.exports = registration;