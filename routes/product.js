const router = require('express').Router();
const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/product');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router
  .route('/')
  .get(getAllProduct)
  .post(authentication, authorization(['ADMIN']), createProduct);

router.get('/:productId', getSingleProduct);

router
  .route('/:productId')
  .patch(authentication, authorization(['ADMIN']), updateProduct)
  .delete(authentication, authorization(['ADMIN']), deleteProduct);

module.exports = router;
