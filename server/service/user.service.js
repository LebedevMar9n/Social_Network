
const { default: mongoose } = require("mongoose");
const { UserModel } = require("../models");

module.exports = {
    findAllUsers: (params = {}) => {
        return UserModel.find(params);
    },
    findOneUser: (params = {}) => {
        return UserModel.findOne(params);
    },
    deleteOneUser: (params) => {
        return UserModel.deleteOne(params);
    },
    createOneUser: (user) => {
        return UserModel.create(user);
    },
    updateOneUser: (params = {}, userData, options = { new: true }) => {
        return UserModel.findOneAndUpdate(params, userData, options);
    },
    agregateUserFollowingPosts: (userId) => {
        return UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            }
        ]);
    },
};