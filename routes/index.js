const router = require('express').Router();
const auth = require('./auth');
const categories = require('./categories');
const product = require('./product');
const order = require('./order');
const user = require('./user');

router.use('/auth', auth);
router.use('/products/categories', categories);
router.use('/products', product);
router.use('/order', order);
router.use('/users', user);

module.exports = router;
