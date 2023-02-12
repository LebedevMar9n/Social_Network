const postController = require('../controllers/post.controller');
const { commonMiddleware, postMiddleware, userMiddleware, fileMiddleware } = require('../middlewares');
const { postValidator } = require('../validators');

const router = require('express').Router();

router.post('/',
    commonMiddleware.isDateValid(postValidator.newPostValidator),
    fileMiddleware.checkImage,
    postController.postPost);
router.get('/:id',
    commonMiddleware.isValidId,
    postMiddleware.isPostPresent,
    postController.getPostById);
router.put('/:id',
    commonMiddleware.isValidId,
    postMiddleware.isPostPresent,
    postMiddleware.isPostBelongToUser,
    postController.putPostById);
router.delete('/:id',
    commonMiddleware.isValidId,
    postMiddleware.isPostPresent,
    postMiddleware.isPostBelongToUser,
    postController.deletePostById);
router.put('/:id/like',
    commonMiddleware.isValidId,
    postMiddleware.isPostPresent,
    postController.likePostById);
router.get('/:id/timeline',
    commonMiddleware.isValidId,
    userMiddleware.isUserPresent,
    postController.getTimeLinePosts);

module.exports = router;