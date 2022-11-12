module.exports = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.query);

  if (error) return next(error);

  return next();
};