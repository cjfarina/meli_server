const fetch = require("node-fetch");
const ItemEndpoint = require("../endpoint/ItemEndpoint");
const { findCategories } = require("../database/Category");
const Item = require("../database/Item");
const { findCurrentUser } = require("../database/User");

const searchItems = async (query) => {
  const items = await ItemEndpoint.searchItems(query);
  const author = findCurrentUser();
  const categories = findCategories(items);
  return { author, categories, items };
};

const getItem = async (itemId) => {
  const item = await ItemEndpoint.findItemById(itemId);
  const categories = findCategories([item]);

  return { item, categories };
};

module.exports = {
  searchItems,
  getItem,
};
