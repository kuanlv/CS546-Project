const express = require('express');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize'); 
const xss = require('xss-clean');
const path = require('path');
const rateLimit = require("express-rate-limit");

const app = express();
// helmet middleware
app.use(helmet({
    frameguard: false
}));
// NoSQL injection protection
app.use(mongoSanitize());
// xss
app.use(xss());
// static middleware
app.use(express.static('public'));
// body parser middleware
app.use(express.json( { limit: '10kb' } ));
app.use(express.urlencoded({extended: true}));
// template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');
// initialize enviroment varaible
const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    PORT =3000,
    NODE_EVN = 'developent',
    SESS_LIFETIME = TWO_HOURS,
    SESS_NAME = 'sid',
    SESS_SECRET = 'love can endure all things'
} = process.env;

const IN_PROD = NODE_EVN == 'production';
// session middleware

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

// set request limit 
const limiter = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});
app.use('/date', limiter);
app.use('/post', limiter);
app.use('/login', limiter);


configRoutes(app);
app.listen(PORT, () => {
    console.log(`Our application will be running on http://localhost:${PORT}`);
});

