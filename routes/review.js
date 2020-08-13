const router = require('express').Router();
const {ensureAuth} = require('../middlware/auth');
const Review = require('../models/Review');

router.get('/add', ensureAuth, (req, res) => {
    res.render('reviews/add', {layout: 'main'});
});



module.exports = router;