function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth');
    }
}
function requireAdminLogin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/auth');
    }
}
module.exports = {requireLogin , requireAdminLogin};
