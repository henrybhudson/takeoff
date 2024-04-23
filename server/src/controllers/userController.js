const User = require('../models/User');
const handleAsync = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = handleAsync(async (req, res) => {
        // Fetch all users but don't fetch the password field
        // lean() tells Mongoose to return a plain JavaScript object instead of a Mongoose document
        const users = await User.find().select('-password').lean();

        if (!users) {
                return res.status(404).json({ message: 'No users found.' });
        }
});

const createUser = handleAsync(async (req, res) => {

});

const login = handleAsync(async (req, res) => {
        const { email, password } = req.body;

        try {
                // Check if the user with that email exists
                var user = await User.findOne({ email });

                if (!user) {
                        return res.status(400).json({ message: 'Invalid email or password.' });
                }

                const passwordIsValid = await bcrypt.compare(password, user.password);

                if (!passwordIsValid) {
                        return res.status(400).json({ message: 'Invalid email or password.' });
                }

                // Remove password from the user object before sending it to the client
                delete user._doc.password;

                res.status(200).json({
                        message: 'Login successful.',
                        user
                });
        } catch (error) {
                res.status(500).json({ message: 'An error occurred while logging in.', error });
        }
});

const register = handleAsync(async (req, res) => {
        const { name, email, password } = req.body;

        try {

                // Check if name, email, and password are provided in the request
                if (!name || !email || !password) {
                        return res.status(400).json({ message: "All fields are required: [Name, Email, Password]." });
                }

                // Check if the user with that email already exists
                // If so, do not allow the user to register
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                        return res.status(400).json({ message: "This account already exists." });
                }

                // Hash the password using bcrypt
                const hashedPassword = await bcrypt.hash(password, 11);

                // Create a new user with the given info
                const newUser = new User({
                        name,
                        email,
                        password: hashedPassword
                });

                // Save this new user to the database
                await newUser.save();

                res.status(200).json({ message: "Registration was successful." });
        } catch (error) {
                res.status(500).json({ message: "An error occurred while registering.", error });
        }

});

module.exports = { getAllUsers, createUser, login, register };