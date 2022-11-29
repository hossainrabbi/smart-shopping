const router = require('express').Router();
const authentication = require('../middleware/authentication');
const { getProfile, updateProfile } = require('../controller/profile');

router.route('/').get(authentication, getProfile);
router.route('/').put(authentication, updateProfile);

module.exports = router;
