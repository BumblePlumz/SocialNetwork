import { User } from "./User.js";
import { Subscription } from "./Subscription.js";
import { Comment } from "./Comment.js";
import { Article } from "./Article.js";

export const setupRelations = () => {
  User.hasMany(Subscription, { foreignKey: "ownerID" });
  User.hasMany(Subscription, { foreignKey: "targetID" });

  Subscription.belongsTo(User, {
    foreignKey: "ownerID",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  });
  Subscription.belongsTo(User, {
    foreignKey: "targetID",
    onDelete: "SET DEFAULT",
    onUpdate: "RESTRICT",
    defaultValue: 0,
  });

  User.hasMany(Comment, { foreignKey: "userID", as: "comments" });
  User.hasMany(Article, { foreignKey: "authorID", as: "articles" });

  Comment.belongsTo(User, {
    foreignKey: "userID",
    onDelete: "SET DEFAULT",
    onUpdate: "RESTRICT",
    defaultValue: 0,
  });

  Comment.belongsTo(Article, {
    foreignKey: "articleID",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  });

  Article.belongsTo(User, {
    foreignKey: "authorID",
    onDelete: "SET DEFAULT",
    onUpdate: "RESTRICT",
    defaultValue: 0,
  });
  Article.hasMany(Comment, { foreignKey: "articleID", as : "comments" });
};
