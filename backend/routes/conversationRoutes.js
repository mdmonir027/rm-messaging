const router = require('express').Router();
const authenticate = require('../middleware/passport/authenticate');

const { index, all, create } = require('../controller/conversationController');

router.get('/all', authenticate, all);
router.get('/:receiverId', authenticate, index);
router.get('/add/:receiverId', authenticate, create);

module.exports = router;
