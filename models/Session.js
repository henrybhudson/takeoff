const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
duration_secs: {
        type: Int32Array,
        required: true
},
userID: {
        type: String,
        required: true
},
subject: {
        type: String,
        required: true
},
title: {
        type: String,
        required: true
},
description: {
    type: String,
    required: true
},
});

module.exports = mongoose.model('Session', sessionSchema);