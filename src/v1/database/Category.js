const DB = require("./db.json");

const findCategories = (items) => {
  return DB.categories;
};

module.exports = { findCategories };
