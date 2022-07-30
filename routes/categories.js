const router = require('express').Router();
const {
  postCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require('../controller/categories');

router.route('/').post(postCategory).get(getCategory);
router.route('/:categoryId').delete(deleteCategory).put(updateCategory);

module.exports = router;
