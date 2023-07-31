const itemService = require("../services/itemService");

const searchItems = (req, res) => {
  const items = itemService.searchItems(req.query?.q);
  return res.status(200).json(items);
};

const getItem = (req, res) => {
  const item = itemService.getItem(req.params?.itemId);
  return res.status(200).json(item);
};

module.exports = {
  searchItems,
  getItem,
};
