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
        거래금액: {
          type: DataTypes.STRING(40),
          defaultValue: '',
          allowNull: false,
        },
        건축년도: {
          type: DataTypes.INTEGER(4),
          defaultValue: 0,
          allowNull: false,
        },
        도로명: {
          type: DataTypes.STRING(20),
          defaultValue: '',
          allowNull: false,
        },
        도로명건물본번호코드: {
          type: DataTypes.INTEGER(6),
          defaultValue: 0,
          allowNull: false,
        },
        도로명건물부번호코드: {
          type: DataTypes.INTEGER(6),
          defaultValue: 0,
          allowNull: false,
        },
        도로명시군구코드: {
          type: DataTypes.INTEGER(6),
          defaultValue: 0,
          allowNull: false,
        },
        도로명일련번호번호코드: {
          type: DataTypes.INTEGER(3),
          defaultValue: 0,
          allowNull: false,
        },
        도로명지상지하코드: {
          type: DataTypes.INTEGER(2),
          defaultValue: 0,
          allowNull: false,
        },
        도로명코드: {
          type: DataTypes.INTEGER(8),
          defaultValue: 0,
          allowNull: false,
        },
        법정동: {
          type: DataTypes.STRING(40),
          defaultValue: 0,
          allowNull: false,
        },
        법정동건물본번호코드: {
          type: DataTypes.INTEGER(5),
          defaultValue: 0,
          allowNull: false,
        },
        법정동건물부번호코드: {
          type: DataTypes.INTEGER(5),
          defaultValue: 0,
          allowNull: false,
        },
        법정동시군구코드: {
          type: DataTypes.INTEGER(6),
          defaultValue: 0,
          allowNull: false,
        },
        법정동읍면동코드: {
          type: DataTypes.INTEGER(6),
          defaultValue: 0,
          allowNull: false,
        },
        법정동지번코드: {
          type: DataTypes.INTEGER(2),
          defaultValue: 0,
          allowNull: false,
        },
        아파트: {
          type: DataTypes.STRING(40),
          defaultValue: 0,
          allowNull: false,
        },
        년: {
          type: DataTypes.INTEGER(4),
          defaultValue: 0,
          allowNull: false,
        },
        월: {
          type: DataTypes.INTEGER(2),
          defaultValue: 0,
          allowNull: false,
        },
        일: {
          type: DataTypes.INTEGER(6),
          defaultValue: 0,
          allowNull: false,
        },
        일련번호: {
          type: DataTypes.STRING(15),
          defaultValue: '',
          allowNull: false,
        },
        전용면적: {
          type: DataTypes.FLOAT(20),
          defaultValue: 0,
          allowNull: false,
        },
        지번: {
          type: DataTypes.INTEGER(10),
          defaultValue: 0,
          allowNull: false,
        },
        지역코드: {
          type: DataTypes.INTEGER(5),
          defaultValue: 0,
          allowNull: false,
        },
        층: {
          type: DataTypes.INTEGER(4),
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        modelName: 'Apartment',
        tableName: 'apartment',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
