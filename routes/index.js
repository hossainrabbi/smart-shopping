const router = require('express').Router();
const auth = require('./auth');
const categories = require('./categories');

router.use('/auth', auth);
router.use('/products/categories', categories);

module.exports = router;
