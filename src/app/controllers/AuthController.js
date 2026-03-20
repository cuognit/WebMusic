const User = require('../models/Users');
const bcrypt = require('bcryptjs');

class AuthController {
    // [GET] /login
    async Login(req, res, next) {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                //res.json(user.email);
                // res.status(200).json({ message: 'Email không tồn tại. Vui lòng đăng ký.' });
                // return;
                res.json({success:true,message3:'Email không tồn tại. Vui lòng đăng ký.'})
                return;
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                res.json({success:true,message3:'Mật khẩu không đúng. Vui lòng thử lại.'})
                return;
            }
            req.session.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                statusLogin: user.statusLogin,
                verified: user.verified,
                playlist: user.playlist,
                favorites: user.favorites,
                watched: user.watched,
                slug: user.slug,
            };
            user.statusLogin = true;
            await user.save();
            res.json({success:true,message2:'Đăng nhập thành công.'})


        }catch (err) {
            next(err);
        }
        
    }
    // [GET] /register
    async Register(req, res, next) {
        try {
            const email = req.body.email;
            const user = await User.findOne({ email });
            if (!user || user == null) {
                const user = await new User(req.body);
                await user.save();
                res.json({success:true,message2:'Đăng ký thành công. '})
                return;
            } else {
                res.json({success:true,message3:'Email đã tồn tại. Vui lòng sử dụng email khác.'})
                return;
            }
            } catch (err) {
            next(err);
            }
        }
        //[POST] logout
        async Logout(req, res, next) {
            try{
                const userEmail = req.session.user.email;
                const user = await User.findOne({ email: userEmail });
                user.statusLogin = false;
                await user.save();
                req.session.destroy();
                res.json({success:true,message2:'Đăng xuất thành công.'})

            }
            catch{
                next(err);
            }
        }
}

module.exports = new AuthController();
