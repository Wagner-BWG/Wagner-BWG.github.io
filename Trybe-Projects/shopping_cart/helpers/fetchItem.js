const fetchItem = (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  if (item !== undefined) {
    return fetch(url).then((response) => response.json()).then((data) => data);
  }
  throw new Error('You must provide an url.');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
