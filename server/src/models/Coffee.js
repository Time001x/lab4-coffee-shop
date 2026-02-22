module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    type: DataTypes.STRING,      // hot / iced / frappe
    image: DataTypes.STRING,
    status: DataTypes.STRING,    // มีจำหน่าย / หมด
    description: DataTypes.TEXT
  })

  return Coffee
}
