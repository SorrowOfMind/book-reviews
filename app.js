const express = require('express');
const connectDb = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const router = require('./routes/index');
require('dotenv').config({path: '.env'});


const app = express();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/', router)

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))