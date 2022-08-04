const router = require('express').Router();
const auth = require('./auth');
const categories = require('./categories');
const product = require('./product');

router.use('/auth', auth);
router.use('/products/categories', categories);
router.use('/products', product);

module.exports = router;
