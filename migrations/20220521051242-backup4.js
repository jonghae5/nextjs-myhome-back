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
      queryInterface.addColumn(`ability`, `allow`, {
        type: Sequelize.INTEGER(30),
        defaultValue: 0,
        allowNull: true,
      }),
      queryInterface.addColumn(`ability`, `allowMoney`, {
        type: Sequelize.INTEGER(30),
        defaultValue: 0,
        allowNull: true,
      }),
      queryInterface.addColumn(`ability`, `allowJeonse`, {
        type: Sequelize.INTEGER(30),
        defaultValue: 0,
        allowNull: true,
      }),
      queryInterface.addColumn(`ability`, `allowLoan`, {
        type: Sequelize.INTEGER(30),
        defaultValue: 0,
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
