const itemService = require("../services/itemService");

const searchItems = async (req, res) => {
  try {
    const items = await itemService.searchItems(req.query?.q);
    return res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getItem = async (req, res) => {
  try {
    const item = await itemService.getItem(req.params?.itemId);
    return res.status(200).json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  searchItems,
  getItem,
};
