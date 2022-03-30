const clearCart = document.querySelector('.empty-cart');
const cart = document.querySelector('.cart__items');
const cartTotal = document.querySelector('.total-price');
let cartItems;
let itemsValues;

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCartProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'cart_item_image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function sumItems() {
  if (itemsValues.length > 0) {
    const cartItemsTotal = itemsValues.reduce((total, price) => total + price);
    const cartItemsTotalAdjusted = cartItemsTotal.toFixed(2);
    cartTotal.innerText = `Total dos produtos R$${cartItemsTotalAdjusted}`;
  } else cartTotal.innerText = 'Sem produtos no carrinho de compras.';
}

function cartItemClickListener() {  
  const cartArray = this.parentElement.childNodes;
  const itemIndex = Object.keys(cartArray).find((key) => cartArray[key] === this);
  // console.log(itemIndex);
  cartItems.splice(itemIndex, 1);
  itemsValues.splice(itemIndex, 1);
  sumItems();
  // console.log(itemsValues);
  saveCartItems(cartItems);
  localStorage.setItem('itemsValues', JSON.stringify(itemsValues));
  this.remove();
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.title = 'Clique para remover do carrinho.'
  ///
  const section = document.createElement('section');
  section.className = 'cart_item_text'
  
  li.appendChild(createCartProductImageElement(image));
  section.appendChild(createCustomElement('span', 'cart_item_title', name));
  section.appendChild(createCustomElement('span', 'cart_item_price', `R$${salePrice}`));
  li.appendChild(section);
  // li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addPriceTotal(price) {
  itemsValues.push(price);
  console.log(itemsValues);
  sumItems();
}

function addItemToCart() {
  const itemSku = this.parentElement.querySelector('.item__sku').innerText;
  fetchItem(itemSku).then((response) => {
    const obj = {
      sku: response.id,
      name: response.title,
      salePrice: response.price,
      image: response.thumbnail,
    };
    const item = createCartItemElement(obj);
    cart.appendChild(item);
    cartItems.push(obj.sku);
    addPriceTotal(obj.salePrice);
    saveCartItems(cartItems);
    localStorage.setItem('itemsValues', JSON.stringify(itemsValues));
  });
}

function addSavedItemToCart(itemSku) {
  fetchItem(itemSku).then((response) => {
    const obj = {
      sku: response.id,
      name: response.title,
      salePrice: response.price,
    };
    const item = createCartItemElement(obj);
    cart.appendChild(item);
    // addPriceTotal(obj.salePrice);
  });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addToCartButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addToCartButton);
  addToCartButton.addEventListener('click', addItemToCart);

  return section;
}

function createLoadingItemElement() {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'loading', 'carregando...'));
  return section;
}

function createLoadingList() {
  const productList = document.getElementsByClassName('items')[0];
  for (let i = 0; i < 50; i += 1) {
    productList.appendChild(createLoadingItemElement());
  }
}

function deleteLoadingList() {
  const loadingList = document.querySelectorAll('.loading');
  loadingList.forEach((item) => {
    item.parentElement.remove();
  });
}

function createProductList(product) {
  const productList = document.getElementsByClassName('items')[0];
  productList.appendChild(createProductItemElement(product));
}

async function loadProducts() {
  const response = await fetchProducts('computador');
  const productList = response.results;
  productList.forEach((product) => {
    productObj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    createProductList(productObj);
  });
  deleteLoadingList();
}

function clearTheCart() {
  // console.log('clear the cart!');
  cart.innerHTML = '';
  cartItems = [];
  itemsValues = [];
  sumItems();
  saveCartItems(cartItems);
  localStorage.setItem('itemsValues', JSON.stringify(itemsValues));
}

window.onload = () => {
  clearCart.addEventListener('click', clearTheCart);
  createLoadingList();
  loadProducts();
  const savedData = getSavedCartItems();
  // console.log(savedData);
  cartItems = JSON.parse(savedData[0]);
  itemsValues = JSON.parse(savedData[1]);
  if (cartItems === null) {
    cartItems = [];
  }
  if (itemsValues === null) {
    itemsValues = [];
  }
  cartItems.forEach((item) => addSavedItemToCart(item));
  sumItems();
};
