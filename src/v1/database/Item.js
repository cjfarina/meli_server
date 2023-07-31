const DB = require("./db.json");

const searchItems = (query) => {
  const items = DB.items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      picture: item.picture,
      condition: item.condition,
      free_shipping: item.free_shipping,
      location: item.location, //Added location because it is required in the designs
    };
  });
  return items;
};

const findItemById = (id) => {
  return DB.items.find((value) => value.id === id);
};

module.exports = { searchItems, findItemById };
