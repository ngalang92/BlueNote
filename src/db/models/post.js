"use strict";
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {

//#1
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

//#2
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
     type: DataTypes.INTEGER,
     allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here

//#3
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });

     Post.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
     });

     Post.hasMany(models.Comment, {
       foreignKey: "postId",
       as: "comments"
     });

     Post.hasMany(models.Vote, {
        foreignKey: "postId",
        as: "votes"
     });

     Post.hasMany(models.Favorite, {
       foreignKey: "postId",
       as: "favorites"
     });

     Post.afterCreate((post, callback) => {
       return models.Favorite.create({
         userId: post.userId,
         postId: post.id
       });
     });

     Post.afterCreate((post, callback) => {
        return models.Vote.create({
          userId: post.userId,
          postId: post.id,
          value: 1
        });
     });

  };

  Post.prototype.getPoints = function(){

// #1
    if(this.votes.length === 0) return 0

// #2
    return this.votes
      .map((v) => { return v.value })
      .reduce((prev, next) => { return prev + next });
  };

  Post.prototype.hasUpvoteFor = function(){
     if(this.votes.userId === this.userId) return 'true';
  };
  Post.prototype.hasDownvoteFor = function(){
     if(this.votes.userId === this.userId) return 'true';
  };

  Post.prototype.getFavoriteFor = function(userId){
    return this.favorites.find((favorite) => { return favorite.userId == userId });
  };

  return Post;
};
