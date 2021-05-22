'use strict';
const axios = require('axios')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return axios.get('https://jsonplaceholder.typicode.com/albums').then((result) => {
       return queryInterface.bulkInsert('albums', result.data).catch((err) => {
      const errorData = {
        code: err.parent.code,
        message: err.parent.sqlMessage
      }
      console.log(errorData)
    })
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
