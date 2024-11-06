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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});