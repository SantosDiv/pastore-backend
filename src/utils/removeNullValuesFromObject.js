const removeNullValuesFromObject = (object) => {
  const keys = Object.keys(object);

  keys.forEach((key) => {
    if (!object[key]) {
      delete object[key];
    }
  });

  return object;
}

module.exports = removeNullValuesFromObject;