'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [
      queryInterface.changeColumn(`apartment`, `건축년도`, {
        type: Sequelize.STRING(4),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `도로명건물본번호코드`, {
        type: Sequelize.STRING(6),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `도로명건물부번호코드`, {
        type: Sequelize.STRING(6),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `도로명시군구코드`, {
        type: Sequelize.STRING(6),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `도로명일련번호번호코드`, {
        type: Sequelize.STRING(3),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `도로명지상지하코드`, {
        type: Sequelize.STRING(2),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `도로명코드`, {
        type: Sequelize.STRING(8),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `법정동건물본번호코드`, {
        type: Sequelize.STRING(5),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `법정동건물부번호코드`, {
        type: Sequelize.STRING(5),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `법정동시군구코드`, {
        type: Sequelize.STRING(6),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `법정동읍면동코드`, {
        type: Sequelize.STRING(6),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `법정동지번코드`, {
        type: Sequelize.STRING(2),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `년`, {
        type: Sequelize.STRING(4),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `월`, {
        type: Sequelize.STRING(2),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `일`, {
        type: Sequelize.STRING(2),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `지역코드`, {
        type: Sequelize.STRING(5),
        defaultValue: '',
        allowNull: true,
      }),
      queryInterface.changeColumn(`apartment`, `층`, {
        type: Sequelize.STRING(4),
        defaultValue: '',
        allowNull: true,
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
