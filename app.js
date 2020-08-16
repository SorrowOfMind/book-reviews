const express = require('express');
const connectDb = require('./config/db');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const {formatDate, truncate, stripTags, editIcon} = require('./helpers/hbs');

require('dotenv').config({path: '.env'});
require('./config/passport')(passport);

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.engine('.hbs', exphbs({helpers: {
    formatDate,
    truncate,
    stripTags,
    editIcon
},defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'catnip',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/reviews', reviewRoutes);

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))