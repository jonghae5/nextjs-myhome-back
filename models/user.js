const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
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
        email: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true, // 필수
          unique: true, // 고유한 값
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: true, // 필수 X
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true, // 필수 X
        },
        snsId: {
          type: DataTypes.STRING(30),
          allowNull: true, // 필수 X
        },
        provider: {
          type: DataTypes.STRING(10),
          allowNull: true, // 필수 X
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasOne(db.Ability, {
      //   foreignKey: 'fk_email',
      onDelete: 'CASCADE',
    }),
      db.User.hasOne(db.Basic, {
        //   foreignKey: 'fk_email',
        onDelete: 'CASCADE',
      });
  }
};
