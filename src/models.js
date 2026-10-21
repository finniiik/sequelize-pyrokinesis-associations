const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Альбом («родитель»)
const Album = sequelize.define('Album', {
  title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  year: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 2000, max: 2100 } },
}, { tableName: 'albums' });

// Песня («ребёнок»)
const Song = sequelize.define('Song', {
  title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  durationSec: { type: DataTypes.INTEGER, validate: { min: 1 } },
  isSingle: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'songs' });

// Связь 1:N в паре: внешний ключ albumId создаётся в таблице songs
Album.hasMany(Song, { foreignKey: 'albumId', as: 'songs', onDelete: 'CASCADE' });
Song.belongsTo(Album, { foreignKey: 'albumId', as: 'album' });

module.exports = { sequelize, Album, Song };
