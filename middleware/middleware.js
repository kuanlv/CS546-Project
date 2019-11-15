const redirectUser = async (req, res, next) => {
    if (req.session.userId) {
        console.log('middle');
        return res.redirect('/user');
    }
    next();
};

const redirectLogin = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};


module.exports = {
    redirectUser,
    redirectLogin
};