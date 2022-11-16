const router = require('express').Router();

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { postOrder, getOrder } = require('../controller/order');

router
  .route('/')
  .post(authentication, postOrder)
  .get(authentication, authorization(['ADMIN']), getOrder);

module.exports = router;
