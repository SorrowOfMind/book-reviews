const express = require('express');
const connectDb = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

require('dotenv').config({path: '.env'});
require('./config/passport')(passport);

const app = express();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'catnip',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRoutes);
app.use('/auth', authRoutes);

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))