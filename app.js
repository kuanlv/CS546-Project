const express = require('express');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();
// static middleware
app.use(express.static('public'));
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// initialize enviroment varaible
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


configRoutes(app);
app.listen(PORT, () => {
    console.log(`Our application will be running on http://localhost:${PORT}`);
});

