const router = require('express').Router();
const { createProduct, getAllProduct } = require('../controller/product');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.route('/').get(getAllProduct);
router.route('/').post(authentication, authorization(['ADMIN']), createProduct);

module.exports = router;
