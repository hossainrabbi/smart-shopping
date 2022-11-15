const router = require('express').Router();
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const { getAllUsers, removeUser, makeAdmin } = require('../controller/user');

router.get('/', authentication, authorization(['ADMIN']), getAllUsers);

router
  .route('/:userId')
  .delete(authentication, authorization(['ADMIN']), removeUser)
  .get(authentication, authorization(['ADMIN']), makeAdmin);

module.exports = router;
