const { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } = require("../constants/regular.constants");
const { CustomError } = require("../error/CustomError");

module.exports = {
  checkImage:(file)=> async (req, res, next) => {
    try {
      if (!req.files[file]) {
        return next();
      }
      const { mimetype, size } = req.files[file];

      if (size > IMAGE_MAX_SIZE) {
        return next(new CustomError('Max size 3MB'));
      }

      if (!IMAGE_MIMETYPES.includes(mimetype)) {
        return next(new CustomError('Wrong file type'));
      }

      next();
    } catch (e) {
      next(e);
    }
  },
}