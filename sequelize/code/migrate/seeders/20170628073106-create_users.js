'use strict';

const faker = require('faker');
faker.locale = "zh_CN";

const db = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const Users = Array.from({length:20}, () => {
      return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        bio: faker.name.jobTitle(),
        Book: {
          title: faker.lorem.word(),
          desc: faker.lorem.sentence()
        }
      }
    });
    const User = db.sequelize.models.User;
    return Promise.all(Users.map((item) => {
      return User.create(item, {
        include: [ User.Book ]
      });
    }))
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Person', null, {});
  }
};
