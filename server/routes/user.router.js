const userController = require('../controllers/user.controller');
const { imageTypeEnum } = require('../enums');
const { commonMiddleware, userMiddleware, fileMiddleware } = require('../middlewares');
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
    fileMiddleware.checkImage(imageTypeEnum.PROFILEPICTURE),
    fileMiddleware.checkImage(imageTypeEnum.COVERPICTURE),
    // authMiddleware.checkAccesToken,
    userController.putUserById);

router.delete('/:id',
    commonMiddleware.isValidId,
    userMiddleware.isUserPresent,
    // authMiddleware.checkAccesToken,
    userController.deleteUserById
);

router.put('/:id/follow',
    userMiddleware.isValidForFollowingOrUnfollow(true),
    userController.followUserById
);
router.put('/:id/unfollow',
    userMiddleware.isValidForFollowingOrUnfollow(false),
    userController.unFollowUserById
);

module.exports = router;