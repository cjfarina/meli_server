const { findCategories } = require("../database/Category");
const Item = require("../database/Item");
const { findCurrentUser } = require("../database/User");
const searchItems = (query) => {
  const items = Item.searchItems(query);
  const author = findCurrentUser();
  const categories = findCategories(items);
  return { author, categories, items };
};

const getItem = (itemId) => {
  const item = Item.findItemById(itemId);
  const categories = findCategories([item]);
  return { item, categories };
};

module.exports = {
  searchItems,
  getItem,
};
