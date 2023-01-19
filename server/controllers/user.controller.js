const { passwordService, userService } = require("../service");

module.exports = {
    getUserById: async (req, res, next) => {
        try {
            const { user } = req;

            const { password, ...otherDetail } = user._doc;

            res.json(otherDetail);
        } catch (e) {
            next(e);
        }
    },
    putUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { isAdmin, _id } = req.user;
            const { password } = req.body;

            if (id === _id.toString() || isAdmin) {

                if (password) {
                    req.body.password = await passwordService.hashPassword(password);
                }
                const updatedUser = await userService.updateOneUser({ _id: id }, req.body);
                res.json(updatedUser);
            }

            // if (req.files?.avatar) {
            //     if (req.user.avatar) {
            //         const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', id);
            //         req.body.avatar = Location;
            //     } else {
            //         const { Location } = await s3Service.updateFile(req.files.avatar, req.user.avatar);
            //         req.body.avatar = Location;
            //     }
            // }
        } catch (e) {
            next(e);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { isAdmin, _id } = req.user;

            if (id === _id.toString() || isAdmin) {
                await userService.deleteOneUser({ _id: id });

                if (req.user.avatar) {
                    await s3Service.deleteFile(req.user.avatar);
                }

                res.sendStatus(204);
            }

        } catch (e) {
            next(e);
        }
    },
    followUserById: async (req, res, next) => {
        try {
            const followUser = req.followUser;
            const followingUser = req.followingUser;

            await userService.updateOneUser({ _id: followUser._id }, { $push: { followers: followingUser._id.toString() } });
            await userService.updateOneUser({ _id: followingUser._id }, { $push: { following: followUser._id.toString() } });

            res.status(200).json('User folowed');
        } catch (e) {
            next(e);
        }
    },
    unFollowUserById: async (req, res, next) => {
        try {
            const followUser = req.followUser;
            const followingUser = req.followingUser;

            await userService.updateOneUser({ _id: followUser._id }, { $pull: { followers: followingUser._id.toString() } });
            await userService.updateOneUser({ _id: followingUser._id }, { $pull: { following: followUser._id.toString() } });

            res.status(200).json('User is unfolowed');
        } catch (e) {
            next(e);
        }
    },
    // getUsers: async (req, res, next) => {
    //     try {
    //         const users = await userService.findAllUsers();
    //         const usersForResponse = users.map(user => userPresenter(user));
    //         res.json(usersForResponse);
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    // postUser: async (req, res, next) => {
    //     try {
    //         const { name, email, password, phone } = req.body;

    //         const hashPasword = await passwordService.hashPassword(password);

    //         const user = await userService.createOneUser({ ...req.body, password: hashPasword });

    //         const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', user._id);

    //         const userWithPhoto = await userService.updateOneUser({ _id: user._id }, { avatar: Location });

    //         // const sms = smsTemplateBuilder[smsActionTypeEnum.WELCOME](name);

    //         // await Promise.allSettled([
    //         //     smsService.sendSMS(phone, sms),
    //         //     emailService.sendMail(email, emailActionTypeEnum.WELCOME, { name }),
    //         // ]);


    //         const userForResponse = userPresenter(userWithPhoto);

    //         res.json(userForResponse);
    //     } catch (e) {
    //         next(e);
    //     }
    // },

};