const router = require('express').Router();

const { index, create } = require('../controller/messageController');
const { messageCreateValidator } = require('../validator/messageValidator');
const { validationResultResponse } = require('../utils/errorResponse');
const authenticate = require('../middleware/passport/authenticate');

router.get('/:conversationId', authenticate, index);
router.post(
  '/',
  authenticate,
  messageCreateValidator,
  validationResultResponse,
  create
);

module.exports = router;
