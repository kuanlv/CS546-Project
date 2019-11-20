const profileRoutes = require("./profile");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const homeRoutes = require("./home");
const signupRoutes = require('./signup');
const dateRoutes = require('./date');

const constructorMethod = app => {
    app.use('/', homeRoutes);
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/profile', profileRoutes);
    app.use('/signup', signupRoutes);
    app.use('/date', dateRoutes);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;


