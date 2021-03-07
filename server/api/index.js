const router = require('express').Router();

const stocks = require('./stocks')
const user = require('./user');

router.use('/user', user)
router.use('/stocks', stocks)

module.exports = router;