const Role = require("../models/role");

const esRoleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role: role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

module.exports = {
  esRoleValido,
};
