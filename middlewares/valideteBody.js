const HttpError = require("../helpers/httpError");

const validateBody = schema => {
    const func = (req, res, next) => {
            const { error } = schema.validate(req.body);
            if (error) {
              next(HttpError(400, `missing required name field`));
        }
        next();
    }

    return func;
}

const updateFavorite = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, `missing field favorite`);
    }
    next();
  };

  return func;
};


module.exports = {
  validateBody,
  updateFavorite,
};