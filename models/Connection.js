const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
        userID_1: {
                type: String,
                required: true
        },
        userID_2: {
                type: String,
                required: true
        },
});

module.exports = mongoose.model('Connection', connectionSchema);