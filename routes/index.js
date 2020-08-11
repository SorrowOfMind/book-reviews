const router = require('express').Router();
const {ensureAuth, ensureGuest} = require('../middlware/auth');
const Review = require('../models/Review');

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {layout: 'login'});
});

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const reviews = Review.find({user: req.user.id}).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            reviews
        });
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
    
})

module.exports = router;