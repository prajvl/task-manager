const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signupValidation, loginValidation, handleValidationErrors } = require('../validators/authValidator');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Signup
router.post('/signup', signupValidation, handleValidationErrors, async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists',
                errors: [{ field: 'username', message: 'This username is already taken' }]
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ 
            message: 'Signup successful',
            user: { id: user._id, username: user.username }
        });
    } catch (err) {
        next(err);
    }
});

// Login
router.post('/login', loginValidation, handleValidationErrors, async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid credentials',
                errors: [{ field: 'username', message: 'User not found' }]
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Invalid credentials',
                errors: [{ field: 'password', message: 'Incorrect password' }]
            });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        res.json({ 
            message: 'Login successful',
            token, 
            username: user.username,
            userId: user._id
        });
    } catch (err) {
        next(err);
    }
});

router.get("/",(req,res)=>{
    res.send("Auth route is working")
});

module.exports = router;
