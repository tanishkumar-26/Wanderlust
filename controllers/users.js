const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js'); 

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup'); 
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });      
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
             req.flash('success', 'Welcome to the Wanderlust!');
            return res.redirect('/listings');
        }); 
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup'); // <-- Add return here
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = async (req, res) => {
        req.flash('success','Welcome back to Wanderlust!');
        return res.redirect(res.locals.redirectUrl || '/listings'); 
    };

    
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You are logged out!');
        return res.redirect('/listings'); // <-- Add return here
    }
    );
};