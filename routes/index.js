const userRoutes = require("./user");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const homeRoutes = require("./home");


const constructorMethod = app => {
    app.use('/', homeRoutes);
    app.use('/login', loginRoutes);
    app.use('/logout', logoutRoutes);
    app.use('/user', userRoutes);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;


