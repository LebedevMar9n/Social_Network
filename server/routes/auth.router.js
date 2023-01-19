const { authController } = require('../controllers');
const {
    commonMiddleware,
    userMiddleware,
    authMiddleware
} = require('../middlewares');
const { userValidator } = require('../validators');

const router = require('express').Router();

router.get('/', async (req, res) => { res.send('AuthRout'); });

router.post('/register',
    commonMiddleware.isDateValid(userValidator.newUserValidator),
    userMiddleware.isUniqueEmail,
    authController.registerUser);

router.post('/login',
    authMiddleware.isLoginBodyValid,
    userMiddleware.isUserPresentByEmail,
    authController.login);

// router.route('/register')
//     .post(authController.registerUser);

module.exports = router;
