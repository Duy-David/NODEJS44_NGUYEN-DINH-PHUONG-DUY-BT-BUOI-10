import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sub_foods extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sub_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sub_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sub_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'foods',
        key: 'food_id'
      }
    }
  }, {
    sequelize,
    tableName: 'sub_foods',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sub_id" },
        ]
      },
      {
        name: "food_id",
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
    ]
  });
  }
}
