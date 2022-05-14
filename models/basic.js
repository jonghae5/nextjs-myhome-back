const DataTypes = require('sequelize');
const { Model } = DataTypes;

const dummyAbility = {
  data: {
    yearMoney: 80000000,
    savingRatioMoney: 65,
    mortgageLoan: 4.0,
  },
  loading: false,
};

module.exports = class Basic extends Model {
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
        yearMoney: {
          type: DataTypes.INTEGER(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          defaultValue: 0,
          allowNull: false, // 필수
        },
        savingRatioMoney: {
          type: DataTypes.INTEGER(3),
          defaultValue: 0,
          allowNull: false,
        },
        mortgageLoan: {
          type: DataTypes.INTEGER(3),
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        modelName: 'Basic',
        tableName: 'basic',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Basic.belongsTo(db.User);
  }
};
