const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const mongoSanitize = require('express-mongo-sanitize');



// Set EJS as the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    const reviews = [
        { name: "John Doe", text: "Bluelight has transformed our customer service experience.", image: null },
        { name: "Jane Smith", text: "Fantastic support and timely solutions.", image: null }, // This will use the default image
        // Add more reviews as needed
    ];
    res.render('home/home', { reviews }); // Pass the reviews array to the template
});

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or another service (e.g., Outlook, Yahoo) or SMTP settings for custom domains
        auth: {
            user: 'your-email@example.com', // Replace with your email
            pass: 'your-email-password'     // Replace with your email password or app-specific password
        }
    });

    // Email options
    let mailOptions = {
        from: email, // Sender's email
        to: 'your-email@example.com', // Your email address to receive messages
        subject: `Contact Form Submission: ${subject}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Send email and handle response
    try {
        await transporter.sendMail(mailOptions);
        res.send("Thank you for your message! We'll get back to you shortly.");
    } catch (error) {
        console.error('Error sending email:', error);
        res.send("Sorry, there was an error sending your message. Please try again later.");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});