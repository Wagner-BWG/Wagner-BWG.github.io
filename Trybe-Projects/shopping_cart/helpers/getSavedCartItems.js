const getSavedCartItems = () => {
  const savedData = localStorage.getItem('cartItems');
  const savedPrices = localStorage.getItem('itemsValues');
  return [savedData, savedPrices];
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
