const User = require('../models/User');
const handleAsync = require('express-async-handler');
const bcrypt = require('bcrypt');

export const getAllUsers = handleAsync(async (req, res) => {
        // Fetch all users but don't fetch the password field
        // lean() tells Mongoose to return a plain JavaScript object instead of a Mongoose document
        const users = await User.find().select('-password').lean();

        if (!users) {
                return res.status(404).json({ message: 'No users found.' });
        }


});

export const createUser = handleAsync(async (req, res) => {

});