const DB = require("./db.json");

const findCurrentUser = () => {
  return DB.currentUser;
};

module.exports = { findCurrentUser };
