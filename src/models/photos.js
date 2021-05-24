'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.photos.belongsTo(models.albums, {
        foreignKey: 'albumId'
      })
    }
  };
  photos.init({
    albumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'photos',
  });
  return photos;
};