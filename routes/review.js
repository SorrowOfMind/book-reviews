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

router.get('/', ensureAuth, async (req, res) => {
    try { 
        const reviews = await Review.find()
            .populate('user')
            .sort({craetedAt: 'desc'})
            .lean();
        res.render('reviews/index', {reviews});
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const review = await Review.findOne({_id: req.params.id}).lean();
        if (!review) res.render('errors/404');
        if (review.user.toString() != req.user._id) {
            res.redirect('/reviews');
        }
        else res.render('reviews/edit', {review});
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})


module.exports = router;