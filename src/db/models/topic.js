'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    }); //end Banner

    Topic.hasMany(models.Rule, {
      foreignKey: "topicId",
      as: "rules",
    }); //end Rule

    Topic.hasMany(models.Advertisement, {
      foreignKey: "topicId",
      as: "advertisements",
    }); //end Advertisement
  };
  return Topic;
};
