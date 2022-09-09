const router = require('express').Router();
const { postOrder } = require('../controller/order');

router.route('/').post(postOrder);

module.exports = router;
