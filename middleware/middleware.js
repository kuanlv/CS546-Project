const redirectUser = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/user');
    }
    next();
};

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    redirectUser,
    redirectLogin
};