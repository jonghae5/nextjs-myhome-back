const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Apartment extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },

        법정동코드: {
          type: DataTypes.STRING(15),
          defaultValue: 0,
          allowNull: false,
        },
        법정동명: {
          type: DataTypes.STRING(30),
          defaultValue: 0,
          allowNull: false,
        },
        폐지여부: {
          type: DataTypes.STRING(5),
          defaultValue: 0,
          allowNull: false,
        },
        법정동코드5자리: {
          type: DataTypes.STRING(10),
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        modelName: 'Dong',
        tableName: 'dong',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
