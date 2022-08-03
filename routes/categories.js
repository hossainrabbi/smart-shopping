const router = require('express').Router();
const {
  postCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require('../controller/categories');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router
  .route('/')
  .post(authentication, authorization(['ADMIN']), postCategory)
  .get(getCategory);

router
  .route('/:categoryId')
  .delete(authentication, authorization(['ADMIN']), deleteCategory)
  .put(authentication, authorization(['ADMIN']), updateCategory);

module.exports = router;
