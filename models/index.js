const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const ability = require('./ability');
const user = require('./user');
const basic = require('./basic');
const apartment = require('./apartment');
const dong = require('./dong');

db.Ability = ability;
db.User = user;
db.Basic = basic;
db.Apartment = apartment;
db.Dong = dong;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
