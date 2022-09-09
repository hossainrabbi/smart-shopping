const router = require('express').Router();
const auth = require('./auth');
const categories = require('./categories');
const product = require('./product');
const order = require('./order');

router.use('/auth', auth);
router.use('/products/categories', categories);
router.use('/products', product);
router.use('/order', order);

module.exports = router;
