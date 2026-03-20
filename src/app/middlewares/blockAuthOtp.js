module.exports = (req, res, next) => {
    if (!req.session.tempUser) {
        return res.redirect('/register');
    }
    next();
};
