const { userService, passwordService, tokenService } = require("../service");

module.exports = {
    registerUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPasword = await passwordService.hashPassword(password);

            const newUser = await userService.createOneUser({ ...req.body, password: hashPasword });

            const { access_token } = tokenService.generateAuthToken({
                email: newUser.email, id: newUser._id
            });

            res.status(200).json({
                user: newUser,
                access_token
            });

        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id, email } = req.user;
            const { password } = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const { access_token } = tokenService.generateAuthToken({
                email: email, id: _id
            });

            // await Oauth.create({
            //     userId: _id,
            //     ...tokens,
            // });

            res.json({
                user: req.user,
                access_token
            });
        } catch (e) {
            next(e);
        }
    },
};