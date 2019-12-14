const redirectDate = async (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/date');
    }
    next();
};

const redirectLogin = async (req, res, next) => {
    if (req.session.newid) 
        return next();
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};


module.exports = {
    redirectDate,
    redirectLogin
};