const router = require('express').Router();
const {
  createProduct,
  getAllProduct,
  deleteProduct,
} = require('../controller/product');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router
  .route('/')
  .get(getAllProduct)
  .post(authentication, authorization(['ADMIN']), createProduct);

router
  .route('/:productId')
  .delete(authentication, authorization(['ADMIN']), deleteProduct);

module.exports = router;
