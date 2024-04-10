const express = require('express');
const path = require('path');
const app = express();
const { logger, logEvents } = require('./server/middleware/logger');
const errorHandler = require('./server/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./server/config/corsOptions');
const connectToDatabase = require('./server/config/dbConnection');
const mongoose = require('mongoose');
require('./server/node_modules/dotenv/lib/main').config();

const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/', require('./server/routes/root'));
app.use('/users/', require('./server/routes/userRoutes'));

// Deal with the 404 errors
app.all('*', (req, res) => {
        res.status(404);
        if (req.accepts('html')) {
                res.sendFile(path.join(__dirname, 'views', '404.html'));
        } else if (req.accepts('json')) {
                res.json({ message: '404 - Not Found' });
        } else {
                res.type('txt').send('404 - Not Found');
        }
});

app.use(errorHandler);

// Once we have connected to the database, start the server.
mongoose.connection.once('open', () => {
        app.listen(PORT, () => {
                console.log(`🚀 Server is running on port ${PORT}.`)
        });
});

mongoose.connection.on('error', (err) => {
        console.error(err);
        logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'databaseErrors.log');
});
