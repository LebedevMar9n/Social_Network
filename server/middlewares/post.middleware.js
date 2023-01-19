const { CustomError } = require("../error/CustomError");
const { postService } = require("../service");


module.exports = {
    isPostPresent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const post = await postService.findOnePost({ _id: id });
            if (!post) {
                return next(new CustomError('Post not found', 404));
            }
            req.post = post;
            next();
        } catch (e) {
            next(e);
        }
    },
    isPostBelongToUser: async (req, res, next) => {
        try {
            const { userId } = req.body;

            if (userId !== req.post.userId) {
                return next(new CustomError('Actioin Forbiden', 404));
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};