const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Temporary in-memory storage
const userDataStore = [];

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Advanced User Form', errors: {}, values: {} });
});

app.post('/submit', (req, res) => {
    const { name, email, age, password, confirmPassword } = req.body;
    const errors = {};

    // Server-side validation logic
    if (!name || name.trim().length < 3) {
        errors.name = 'Name must be at least 3 characters long.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please provide a valid email address.';
    }
    if (!age || isNaN(age) || parseInt(age) < 18) {
        errors.age = 'You must be at least 18 years old.';
    }
    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }
    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
        // If there are errors, re-render the form with error messages
        return res.render('index', { 
            title: 'Advanced User Form', 
            errors, 
            values: req.body 
        });
    }

    // Store data if valid
    const newUser = {
        id: Date.now(),
        name,
        email,
        age,
        submittedAt: new Date().toLocaleString()
    };
    userDataStore.push(newUser);

    res.render('success', { 
        title: 'Submission Successful', 
        user: newUser 
    });
});

app.get('/data', (req, res) => {
    res.render('data', { 
        title: 'Stored User Data', 
        users: userDataStore 
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
