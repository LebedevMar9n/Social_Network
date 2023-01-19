const { postService, userService } = require("../service");

module.exports = {
    postPost: async (req, res, next) => {
        try {
            const post = await postService.createOnePost(req.body);

            res.status(200).json(post);
        } catch (e) {
            next(e);
        }
    },
    getPostById: async (req, res, next) => {
        try {
            const { post } = req;

            res.json(post);
        } catch (e) {
            next(e);
        }
    },
    putPostById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const updatedPost = await postService.updateOnePost({ _id: id }, req.body);

            res.json(updatedPost);
        } catch (e) {
            next(e);
        }
    },
    deletePostById: async (req, res, next) => {
        try {
            const { id } = req.params;

            await postService.deleteOnePost({ _id: id });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    likePostById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            if (!req.post.likes.includes(userId)) {
                await postService.updateOnePost({ _id: id }, { $push: { likes: userId } });
                res.status(200).json("Post liked");
            } else {
                await postService.updateOnePost({ _id: id }, { $pull: { likes: userId } });
                res.status(200).json("Post unliked");
            }

        } catch (e) {
            next(e);
        }
    },
    getTimeLinePosts: async (req, res, next) => {
        try {
            const userId = req.params.id;

            const currentUserPosts = await postService.findAllPostsByUserId({ userId: userId });
            const followingPosts = await userService.agregateUserFollowingPosts(userId);

            res
                .status(200)
                .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
                    .sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    })
                );
        } catch (e) {
            next(e);
        }
    },
};