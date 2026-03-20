const musicsRouter = require('./musics.js');
const loginRegisterRouter = require('./auth.js');
const adminRouter = require('./admin.js');
const userRouter = require('./user.js');
const {requireLogin,requireAdminLogin} = require('../app/middlewares/requireLogin.js');
function route(app) {
    app.use('/admin',requireAdminLogin,adminRouter);
    app.use('/',musicsRouter);
    app.use('/',loginRegisterRouter);
    app.use('/user',requireLogin,userRouter);

}

module.exports = route;
