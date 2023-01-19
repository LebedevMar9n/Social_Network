const { PostModel } = require("../models");

module.exports = {
    createOnePost: (post) => {
        return PostModel.create(post);
    },
    findOnePost: (params = {}) => {
        return PostModel.findOne(params);
    },
    updateOnePost: (params = {}, postData, options = { new: true }) => {
        return PostModel.findOneAndUpdate(params, postData, options);
    },
    deleteOnePost: (params) => {
        return PostModel.deleteOne(params);
    },
    findAllPostsByUserId: (params = {}) => {
        return PostModel.find(params);
    },

    // findAllUsers: (params = {}) => {
    //     return UserModel.find(params);
    // },


};