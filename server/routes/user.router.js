const userController = require('../controllers/user.controller');
const { commonMiddleware, userMiddleware } = require('../middlewares');
const { userValidator } = require('../validators');

const router = require('express').Router();

router.get('/:id',
    commonMiddleware.isValidId,
    userMiddleware.isUserPresent,
    userController.getUserById);

router.put('/:id',
    commonMiddleware.isValidId,
    commonMiddleware.isDateValid(userValidator.updateUserValidator),
    userMiddleware.isUserPresent,
    // authMiddleware.checkAccesToken,
    // fileMiddleware.checkUserAvatar,
    userController.putUserById);

router.delete('/:id',
    commonMiddleware.isValidId,
    userMiddleware.isUserPresent,
    // authMiddleware.checkAccesToken,
    userController.deleteUserById);

router.put('/:id/follow',
    userMiddleware.isValidForFollowingOrUnfollow(true),
    userController.followUserById
);
router.put('/:id/unfollow',
    userMiddleware.isValidForFollowingOrUnfollow(false),
    userController.unFollowUserById
);

module.exports = router;