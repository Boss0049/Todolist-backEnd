module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "TodoList",
    {
      task: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "todolists",
    }
  );
  // models มาจากไหน รับไรมา
  module.associate = (models) => {
    model.belongsTo(models.User, { foreignKey: "user_id " });
  };
  return model;
};
