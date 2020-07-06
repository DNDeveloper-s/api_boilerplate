const User = require('../models/User');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');


module.exports.postSignup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        const hashedPw = await bcrypt.hash(password, 12);

        // Fetching user
        // Checking if user is already exists
        let user = await User.findOne({email});

        if(user) {
            return next(createError(401, 'User with the email already exists'));
        }

        user = new User({
            fullName, 
            email, 
            password: hashedPw,
            image: '/assets/images/default.jpg'
        })

        await user.save();

        return res.json({
            type: 'success',
            message: 'User registered successfully.',
            user: {
                fullName,
                email
            }
        })
    } catch (error) {
        return next(createError(500, 'Something went wrong!'));
    }
}

module.exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        
        if(!user) {
            return next(createError(401, 'User with the email not found!'));
        }

        const doMatch = await bcrypt.compare(password, user.password);

        if(!doMatch) {
            return next(createError(401, 'Password doesn\'t match'));
        }


        const token = jwt.sign({
                userId: user._id.toString(),
                email: user.email
            },                  // Data passed with the token
            'imissananyasomuch',      // Secret key
            { expiresIn: '2312h'}  // Expiration time 
        )

        return res.json({
            type: 'success',
            message: 'Logged in successfully',
            token: token,
            userId: user._id.toString()
        })

    } catch (e) {
        return next(createError(500, 'Something went wrong!'));
    }
}