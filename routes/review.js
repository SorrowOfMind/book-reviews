const router = require('express').Router();
const {ensureAuth} = require('../middlware/auth');
const Review = require('../models/Review');

router.get('/add', ensureAuth, (req, res) => {
    res.render('reviews/add', {layout: 'main'});
});

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Review.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
});


module.exports = router;