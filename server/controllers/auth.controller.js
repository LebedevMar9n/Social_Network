const { userService, passwordService } = require("../service");

module.exports = {
    registerUser: async (req, res, next) => {
        try {

            const { password } = req.body;

            const hashPasword = await passwordService.hashPassword(password);

            const newUser = await userService.createOneUser({ ...req.body, password: hashPasword });

            res.status(200).json(newUser);

        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id } = req.user;
            const { password } = req.body;

            await passwordService.comparePassword(hashPassword, password);

            // const tokens = tokenService.generateAuthToken();

            // await Oauth.create({
            //     userId: _id,
            //     ...tokens,
            // });

            res.json({
                user: req.user,
                // ...tokens,
            });
        } catch (e) {
            next(e);
        }
    },
};