const saveCartItems = (cart) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
