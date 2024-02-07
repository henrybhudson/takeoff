const express = require('express');
const path = require('path');
const app = express();
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/', require('./routes/root.js'));

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

app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}.`)
});