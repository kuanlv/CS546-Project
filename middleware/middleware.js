const redirectDate = async (req, res, next) => {
    if (req.session.userId) {
        console.log(req.session);
        console.log('middle');
        return res.redirect('/date');
    }
    next();
};

const redirectLogin = async (req, res, next) => {
    if (!req.session.userId) {
        console.log("gan ha");
        return res.redirect('/login');
    }
    next();
};


module.exports = {
    redirectDate,
    redirectLogin
};