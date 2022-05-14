const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Ability extends Model {
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
        stockMoney: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        bitcoinMoney: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        savingMoney: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        insuranceMoney: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        severanceMoney: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        etcMoney: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        jeonDepositHome: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        jutaekPriceHome: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        jeonWolLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        jutaekLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        tenantLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        creditLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        businessLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        schoolLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
        etcLoan: {
          type: DataTypes.INTEGER(30),
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        modelName: 'Ability',
        tableName: 'ability',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Ability.belongsTo(db.User);
  }
};
