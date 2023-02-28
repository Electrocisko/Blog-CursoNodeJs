//import validator from "validator";
const validator = require('validator');

const validateArticule = (params) => {
    let validate_titel =
    !validator.isEmpty(params.titel) &&
    validator.isLength(params.titel, { min: 5, max: 35 });
    let validate_content = !validator.isEmpty(params.content);
    if (!validate_titel || !validate_content) {
      throw new Error("Error en los datos ingresados");
    }
  };

  //export default validateArticule;

  module.exports = validateArticule;