'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.albums.hasOne(models.photos, {
        foreignKey: 'albumId'
      })
    }
  };
  albums.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'albums',
  });
  return albums;
};