const mongoose = require('mongoose');

const connectToDatabase = async () => {
        try {
                await mongoose.connect(process.env.DATABASE_URI);
                console.log('🔌 Connected to Database.');
        } catch (err) {
                console.error(err);
        }
};

module.exports = connectToDatabase;