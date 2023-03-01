const isANaN = (value) => Number.isNaN(value);
const convertToInteger = (value) => Number.parseInt(value);

module.exports = (req, _res, next) => {
  const { page } = req.query;

  const pageAsNumber = convertToInteger(page);

  if (isANaN(pageAsNumber)) {
    next({ statusCode: 400, message: "Parâmetros inválidos para a paginação" })
  }

  next();
}