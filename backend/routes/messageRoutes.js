const router = require('express').Router();

const { index } = require('../controller/messageController');

const authenticate = require('../middleware/passport/authenticate');

router.get('/', authenticate, index);

module.exports = router;
