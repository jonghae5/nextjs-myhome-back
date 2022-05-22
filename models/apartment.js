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
          type: DataTypes.INTEGER(40),
          defaultValue: 0,
          allowNull: true,
        },
        건축년도: {
          type: DataTypes.STRING(4),
          defaultValue: '',
          allowNull: true,
        },
        도로명: {
          type: DataTypes.STRING(20),
          defaultValue: '',
          allowNull: true,
        },
        도로명건물본번호코드: {
          type: DataTypes.STRING(6),
          defaultValue: '',
          allowNull: true,
        },
        도로명건물부번호코드: {
          type: DataTypes.STRING(6),
          defaultValue: '',
          allowNull: true,
        },
        도로명시군구코드: {
          type: DataTypes.STRING(6),
          defaultValue: '',
          allowNull: true,
        },
        도로명일련번호번호코드: {
          type: DataTypes.STRING(3),
          defaultValue: '',
          allowNull: true,
        },
        도로명지상지하코드: {
          type: DataTypes.STRING(2),
          defaultValue: '',
          allowNull: true,
        },
        도로명코드: {
          type: DataTypes.STRING(8),
          defaultValue: '',
          allowNull: true,
        },
        법정동: {
          type: DataTypes.STRING(40),
          defaultValue: '',
          allowNull: true,
        },
        법정동건물본번호코드: {
          type: DataTypes.STRING(5),
          defaultValue: '',
          allowNull: true,
        },
        법정동건물부번호코드: {
          type: DataTypes.STRING(5),
          defaultValue: '',
          allowNull: true,
        },
        법정동시군구코드: {
          type: DataTypes.STRING(6),
          defaultValue: '',
          allowNull: true,
        },
        법정동읍면동코드: {
          type: DataTypes.STRING(6),
          defaultValue: '',
          allowNull: true,
        },
        법정동지번코드: {
          type: DataTypes.STRING(2),
          defaultValue: '',
          allowNull: true,
        },
        아파트: {
          type: DataTypes.STRING(40),
          defaultValue: '',
          allowNull: false,
        },
        년: {
          type: DataTypes.STRING(4),
          defaultValue: '',
          allowNull: true,
        },
        월: {
          type: DataTypes.STRING(2),
          defaultValue: '',
          allowNull: true,
        },
        일: {
          type: DataTypes.STRING(6),
          defaultValue: '',
          allowNull: true,
        },

        일련번호: {
          type: DataTypes.STRING(15),
          defaultValue: '',
          allowNull: true,
        },
        전용면적: {
          type: DataTypes.FLOAT(20),
          defaultValue: '',
          allowNull: true,
        },
        지번: {
          type: DataTypes.STRING(20),
          defaultValue: '',
          allowNull: true,
        },
        지역코드: {
          type: DataTypes.STRING(5),
          defaultValue: '',
          allowNull: true,
        },
        층: {
          type: DataTypes.INTEGER(5),
          defaultValue: '',
          allowNull: true,
        },
        x: {
          type: DataTypes.FLOAT(15),
          defaultValue: 0,
          allowNull: true,
        },
        y: {
          type: DataTypes.FLOAT(15),
          defaultValue: 0,
          allowNull: true,
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
