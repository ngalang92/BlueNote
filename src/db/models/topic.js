'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Topic.associate = function(models) {
    Topic.hasMany(models.Post, {
      foreignKey: "topicId",
      as: "posts"
    }); //end Post

    Topic.hasMany(models.Flair, {
       foreignKey: "topicId",
       as: "flair"
    }); //end flair

  };
  return Topic;
};
