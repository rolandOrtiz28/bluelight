const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/CatchAsync');
const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo");
const Subscriber = require('./model/Subscriber');

const secret = process.env.SESSION_SECRET;
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bluelightinnovations';

// Connect to MongoDB with extended timeout options
mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 20000, // Timeout after 20 seconds
    connectTimeoutMS: 20000          // Connect timeout of 20 seconds
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const sessionConfig = {
    secret,
    name: '_bluelight',
    resave: false,
    saveUninitialized: true,
    store: MongoDBStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600 // time period in seconds
    }),
    cookie: {
        httpOnly: true,
        // secure: true, // Enable if using HTTPS
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// Set EJS as the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionConfig));
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());
app.use(express.json()); // Place this before any routes

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    const reviews = [
        { name: "John Doe", text: "Bluelight has transformed our customer service experience.", image: null },
        { name: "Jane Smith", text: "Fantastic support and timely solutions.", image: null }
        // Add more reviews as needed
    ];
    res.render('home/home', { reviews }); // Pass the reviews array to the template
});

app.post('/subs', catchAsync(async (req, res) => {
    const { email } = req.body;
    const existingEmail = await Subscriber.findOne({ email });

    if (existingEmail) {
        return res.redirect('/');
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.redirect('/');
}));

app.get('/subscribers', catchAsync(async (req, res) => {
    const subscribers = await Subscriber.find({});
    res.render('subscribers/list', { subscribers });
}));

app.post('/send', catchAsync(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `${email}`,
        to: process.env.GMAIL_EMAIL,
        subject: `New contact form submission: ${subject}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Thank you for your message! We'll get back to you faster than a cat chasing a laser pointer!" });
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
