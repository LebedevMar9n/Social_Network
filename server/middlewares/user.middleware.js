const { CustomError } = require("../error/customError");
const userService = require("../service/user.service");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.findOneUser({ _id: id });
            if (!user) {
                return next(new CustomError('User not found', 404));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresentByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await userService.findOneUser({ email });
            if (!userByEmail) {
                return next(new CustomError('User not found', 404));
            }
            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findOneUser({ email });
            if (user) {
                return next(new CustomError('User with such ${email} is already exist'));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidForFollowingOrUnfollow: (toFollow = true) => async (req, res, next) => {
        try {
            const id = req.params.id;
            const { currentUserId } = req.body;

            if (currentUserId === id) {
                return next(new CustomError('You can not follow or unfollow yourself', 403));
            }
            const followUser = await userService.findOneUser({ _id: id });
            const followingUser = await userService.findOneUser({ _id: currentUserId });

            switch (toFollow) {
                case true:
                    if (followUser.followers.includes(currentUserId)) {
                        return next(new CustomError('User is already followed by you', 403));
                    }
                    break;

                case false:
                    if (!followUser.followers.includes(currentUserId)) {
                        return next(new CustomError('User is not followed by you', 403));
                    }

                default:
                    next(new Error('Specify toFollow statement'))
                    break;
            }

            req.followUser = followUser;
            req.followingUser = followingUser;

            next();
        } catch (e) {
            next(e);
        }
    },
};