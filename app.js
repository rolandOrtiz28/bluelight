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


// SECURITY
const helmet = require('helmet')
const Joi = require('joi');
const secret = process.env.SESSION_SECRET;
const dbUrl = 'mongodb://127.0.0.1:27017/bluelightinnovations';
// process.env.DB_URL || 
// Connect to MongoDB with extended timeout options
mongoose.connect(dbUrl, {
  serverSelectionTimeoutMS: 5000 // Adjust as needed
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
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

const frameSrcUrls=[
    "https://js.stripe.com/",
    "https://www.sandbox.paypal.com/",
    "https://www.facebook.com",
    ]
    const scriptSrcUrls = [
        "https://stackpath.bootstrapcdn.com/",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css",
        "https://cdn.ckeditor.com/",
        "https://cdnjs.cloudflare.com/",
        "https://ionic.io/ionicons/",
        "https://kit.fontawesome.com/",
        "https://cdnjs.cloudflare.com/",
        "https://cdn.jsdelivr.net",
        "https://www.google-analytics.com",
        "https://code.jquery.com/",
        "https://fontawesome.com",
        "https://js.stripe.com/v3/",
        "https://www.paypal.com/sdk/js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        "https://api2.amplitude.com/",
        "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.3/socket.io.js",
        "https://unpkg.com/@barba/core",
    ];
    const styleSrcUrls = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css", // Add this line
      "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css",
      "https://getbootstrap.com/",
      "https://use.fontawesome.com/",
      "https://cdnjs.cloudflare.com/",
      "https://ionic.io/ionicons/",
      "https://kit-free.fontawesome.com/",
      "https://stackpath.bootstrapcdn.com/",
      "https://fonts.googleapis.com/",
      "https://use.fontawesome.com/",
      "https://fontawesome.com",
      "https://api2.amplitude.com/",
      "https://cdnjs.cloudflare.com/",
  ];
    const connectSrcUrls = [
        "https://unsplash.com/",
     "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css",
        "https://ionic.io/ionicons/",
        "https://unpkg.com/",
        "https://fontawesome.com",
        "https://ka-f.fontawesome.com/",
        "https://www.sandbox.paypal.com/xoplatform/logger/api/logger",
     "https://api2.amplitude.com/",
    ];
    const fontSrcUrls = [
        "https://ionic.io/ionicons/",
     "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css",
        "https://fonts.gstatic.com/",
        "https://cdnjs.cloudflare.com/",
        "https://use.fontawesome.com/",
        "https://fontawesome.com",
        "https://ka-f.fontawesome.com/",
     "https://api2.amplitude.com/",
     "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/fonts/bootstrap-icons.woff",
     "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/fonts/bootstrap-icons.woff2",
    
    ];
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: [],
                formAction: ["'self'"],
                frameSrc:["'self'","'unsafe-inline'",...frameSrcUrls],
                connectSrc: ["'self'", ...connectSrcUrls],
                scriptSrc: ["'unsafe-inline'", "'self'",...scriptSrcUrls],
                styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
                workerSrc: ["'self'", "blob:"],
                objectSrc: [],
                mediaSrc: ["'self'"],
                "script-src-attr": ["'unsafe-inline'"], 
                imgSrc: [
                    "'self'",
                    "blob:",
                    "data:",
                    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`,
                    "https://images.unsplash.com/",
                    "https://i.pinimg.com/564x/6c/bf/00/6cbf00a772725add422adf6bb976f6ba.jpg",
                    "https://media.istockphoto.com/",
                    "https://img.icons8.com/ios-glyphs/256/phone-disconnected.png",
                    "https://source.unsplash.com/collection/10623559",
                    "https://source.unsplash.com/collection/8657917",
                    "https://www.paypalobjects.com/js-sdk-logos/2.2.7/paypal-blue.svg",
                    "https://www.paypalobjects.com/js-sdk-logos/2.2.7/card-black.svg",
                    "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp",
                    "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/images/ui-icons_444444_256x240.png",
    
    
    
    
    
                ],
                fontSrc: ["'self'", ...fontSrcUrls],
            },
        })
    );

// Set EJS as the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionConfig));
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/stylesheet', express.static(path.join(__dirname, 'stylesheet')));
app.use(flash());
app.use(express.json()); // Place this before any routes

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const subscriptionSchema = Joi.object({
    email: Joi.string().email().required()
  });

const contactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(3).max(100).required(),
    message: Joi.string().min(5).max(1000).required()
  });


  app.get('/', (req, res) => {
    const reviews = [
        { name: "John Doe", text: "Bluelight has transformed our customer service experience.", image: null },
        { name: "Jane Smith", text: "Fantastic support and timely solutions.", image: null },
        { name: "Michael Lee", text: "Their team truly cares about customer satisfaction.", image: null },
        { name: "Emily Davis", text: "We've seen a remarkable improvement in our response times.", image: null },
        { name: "Sarah Wilson", text: "Bluelight offers reliable and professional service.", image: null },
        { name: "Robert Brown", text: "Our clients have never been happier with our support.", image: null },
        { name: "Linda Martinez", text: "Seamless integration with our existing system.", image: null }
    ];
    res.render('home/home', { reviews });
});

app.post('/subs', catchAsync(async (req, res) => {
    // Validate the email against the schema
    const { error } = subscriptionSchema.validate(req.body);
    
    if (error) {
      // Return an error message if validation fails
      req.flash('error', 'Please provide a valid email address.');
      return res.redirect('/');
    }
  
    // Sanitize the email input
    const email = req.body.email.trim();
  
    // Check if the email is already subscribed
    const existingEmail = await Subscriber.findOne({ email });
    if (existingEmail) {
      req.flash('success', 'You are already subscribed!');
      return res.redirect('/');
    }
  
    // Save the new subscriber
    const subscriber = new Subscriber({ email });
    await subscriber.save();
  
    req.flash('success', 'Thank you for subscribing!');
    res.redirect('/');
  }));

app.get('/subscribers', catchAsync(async (req, res) => {
    const subscribers = await Subscriber.find({});
    res.render('subscribers/list', { subscribers });
}));

app.post('/send', catchAsync(async (req, res) => {
  // Validate the request data against the schema
  const { error } = contactSchema.validate(req.body);
  
  if (error) {
    // Return an error message if validation fails
    return res.status(400).json({ message: "Invalid data provided.", error: error.details[0].message });
  }

  const { name, email, subject, message } = req.body;

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
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000;
