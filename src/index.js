const path = require('path');
const slugify = require('slugify');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const auth = require('./app/middlewares/auth');
// const nodemailer = require('nodemailer');
// const redisClient = require('./config/redis');
// const { Worker } = require('bullmq');
const dotenv = require('dotenv');
const activeMenu = require('./app/middlewares/activeMenu');
dotenv.config();

const app = express();
const port =  process.env.PORT || 3000;

const route = require('./routes');

const db = require('./config/db');

app.use(methodOverride('_method'));

// Connect to DB

db.connect();

// session
app.use(
    session({
        secret: process.env.SECRET_KEY, // key dùng để mã hóa session cookie
        resave: false, // không lưu session nếu không thay đổi
        saveUninitialized: false, // không tạo session nếu chưa login
        
        cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }, // thời gian sống của cookie (ms)
    }),
);
app.use(auth);
// flash

app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            json: (context) => JSON.stringify(context),
            eq: (a,b) => a===b,
            gt: (a,b) => a>b,
            lt: (a,b) => a<b,
            gte: (a,b) => a>=b,
            lte: (a,b) => a<=b,
            add: (a, b) => a + b,
            sub: (a, b) => a - b,
            mul: (a, b) => a * b,
            div: (a, b) => a / b,
            mod: (a, b) => a % b,
            or: (a, b) => a || b,
            and: (a, b) => a && b,
            not: (a) => !a,
            neq: (a, b) => a !== b,
            currentYear: () => new Date().getFullYear(),
            // sortByViews: (a, b) => {
            icl:(array, value, options) => {
                if(!array) return options.inverse(this);
                const found = array.some(item => item.toString() === value.toString());
                return found ? options.fn(this) : options.inverse(this);
            },
            // }

        },
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(activeMenu.setActiveMenu);
// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
