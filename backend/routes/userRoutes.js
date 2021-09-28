const router = require('express').Router();
const { index, register, login } = require('../controller/userController');
const {
  registerValidator,
  loginValidator,
} = require('../validator/userValidator');
const { validationResultResponse } = require('../utils/errorResponse');
const authenticate = require('../middleware/passport/authenticate');

router.get('/', authenticate, index);
router.post('/register', registerValidator, validationResultResponse, register);
router.post('/login', loginValidator, validationResultResponse, login);

module.exports = router;
