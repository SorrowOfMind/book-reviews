const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Login')
});

router.get('/dashboard', (req, res) => {
    res.send('dashboard')
})

module.exports = router;