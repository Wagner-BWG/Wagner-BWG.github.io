const fetchProducts = (searchedItem) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchedItem}`;

  if (searchedItem !== undefined) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data);
  }
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
