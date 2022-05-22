'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('', { id: Sequelize.INTEGER });
     */

    return [
      queryInterface.addColumn(`apartment`, `x`, {
        type: Sequelize.FLOAT(15),
        defaultValue: 0,
        allowNull: true,
      }),
      queryInterface.addColumn(`apartment`, `y`, {
        type: Sequelize.FLOAT(15),
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

    return [
      queryInterface.removeColumn(`apartment`, `x`),
      queryInterface.removeColumn(`apartment`, `y`),
    ];
  },
};

// npx sequelize migration:create --name backup
//npx sequelize db:migrate --env development

// npx sequelize db:migrate:undo --env development
