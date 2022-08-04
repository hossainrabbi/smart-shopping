const router = require('express').Router();
const { createProduct } = require('../controller/product');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.route('/').post(authentication, authorization(['ADMIN']), createProduct);

module.exports = router;
