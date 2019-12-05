const intermediateRoutes = require("./intermediate");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const homeRoutes = require("./home");
const signupRoutes = require('./signup');
const dateRoutes = require('./date');
const profileRoutes = require('./profile');
const change_profileRoutes = require('./change-profile');
const privateRoutes = require('./private');

const constructorMethod = app => {
    app.use('/', homeRoutes);
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/intermediate', intermediateRoutes);
    app.use('/profile', profileRoutes);
    app.use('/signup', signupRoutes);
    app.use('/date', dateRoutes);
    app.use('/private', privateRoutes);
    app.use('/change-profile', change_profileRoutes);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;


