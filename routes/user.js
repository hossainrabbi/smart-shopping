const router = require('express').Router();
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { getAllUsers, removeUser } = require('../controller/user');

router.get('/', authentication, authorization(['ADMIN']), getAllUsers);

router
  .route('/:userId')
  .delete(authentication, authorization(['ADMIN']), removeUser);

module.exports = router;
