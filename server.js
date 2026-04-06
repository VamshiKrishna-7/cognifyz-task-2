const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'User Input Form' });
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    res.render('response', { 
        title: 'Submission Received', 
        name, 
        email, 
        message 
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
