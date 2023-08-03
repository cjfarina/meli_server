const { default: fetch } = require("node-fetch");

const findValueInAttribute = (item, attributeId, property) => {
  if (!item.attributes) return null;
  const attribute = item.attributes.find((a) => {
    return a.id === attributeId;
  });
  if (!attribute) return null;
  return attribute[property];
};

const getDecimal = (n) => {
  const split = String(n).split(".");

  if (split.length < 2) return 0;
  return Number(split[1]);
};

const searchItems = async (query) => {
  try {
    //I use limit params
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    );
    const json = await response.json();

    if (!json.results) return [];

    const items = json.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id === "ARS" ? "$" : item.currency_id,
          amount: Math.trunc(item.price),
          decimals: getDecimal(item.price),
        },
        picture: item.thumbnail,
        condition: findValueInAttribute(item, "ITEM_CONDITION", "value_name"),
        free_shipping: item.shipping.free_shipping,
        location: item.address.state_name, //Added location because it is required in the designs
      };
    });
    return items;
  } catch (error) {
    throw new Error("Error fetching data.");
  }
};

const findItemById = async (id) => {
  try {
    //I use limit params
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const json = await response.json();

    if (!json) return [];
    const responseDescription = await fetch(
      `https://api.mercadolibre.com/items/${id}/description`
    );
    const jsonDescription = await responseDescription.json();

    const item = {
      id: json.id,
      title: json.title,
      price: {
        currency: json.currency_id === "ARS" ? "$" : json.currency_id,
        amount: Math.trunc(json.price),
        decimals: getDecimal(json.price),
      },
      picture: json.pictures[0]?.url,
      condition: findValueInAttribute(json, "ITEM_CONDITION", "value_name"),
      free_shipping: json.shipping?.free_shipping,
      sold_quantity: json.sold_quantity,
      description: jsonDescription.plainText,
      location: json.seller_address?.state?.name,
    };
    return item;
  } catch (error) {
    throw new Error("Error fetching data.");
  }
};

module.exports = { searchItems, findItemById };
