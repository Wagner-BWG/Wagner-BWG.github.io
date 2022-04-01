const clearCart = document.querySelector('.empty-cart');
const cart = document.querySelector('.cart__items');
const cartTotal = document.querySelector('.total-price');
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-text');
const cartIcon = document.querySelector('.material-icons');
const titlecontainer = document.querySelector('.container-title');
const cartTitleContainer = document.querySelector('.container-cartTitle');
const cartDisplay = document.querySelector('.cart');
const itemsInCartBadge = document.querySelector('.count');

let cartItems;
let itemsValues;
let itemsInCart = 0;

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
  itemsInCart -= 1;
  itemsInCartBadge.innerText = itemsInCart;
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
  itemsInCart += 1;
  itemsInCartBadge.innerText = itemsInCart;
}

function addSavedItemToCart(itemSku) {
  fetchItem(itemSku).then((response) => {
    const obj = {
      sku: response.id,
      name: response.title,
      salePrice: response.price,
      image: response.thumbnail,
    };
    const item = createCartItemElement(obj);
    cart.appendChild(item);
  });
  itemsInCart += 1;
  itemsInCartBadge.innerText = itemsInCart;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const adjustedPrice = price.toFixed(2);
  section.appendChild(createCustomElement('span', 'item__price', `R$${price}`));
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

function clearProductList() {
  const productList = document.querySelectorAll('.item');
  productList.forEach((item) => {
    item.remove();
  });
}

function createProductList(product) {
  const productList = document.getElementsByClassName('items')[0];
  productList.appendChild(createProductItemElement(product));
}

async function loadProducts() {
  clearProductList();
  createLoadingList();
  const searchedItem = searchInput.value;
  console.log(searchedItem);
  const response = await fetchProducts(searchedItem);
  const productList = response.results;
  productList.forEach((product) => {
    productObj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
      price: product.price,
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
  itemsInCart = 0;
  itemsInCartBadge.innerText = itemsInCart;
}

function toggleCart() {
  cartStyle = window.getComputedStyle(cartTitleContainer);
  display = cartStyle.getPropertyValue('display');
  console.log(display);
  if (display === 'flex'){
    cartTitleContainer.style.display = 'none';
    titlecontainer.style.width = '95%';
    cartDisplay.style.display = 'none';
  }
  else {
    cartTitleContainer.style.display = 'flex';
    titlecontainer.style.width = '80%';
    cartDisplay.style.display = 'flex';
  }
}

window.onload = () => {
  if (window.innerWidth < 700){
    toggleCart();
  }
  clearCart.addEventListener('click', clearTheCart);
  cartIcon.addEventListener('click', toggleCart);
  searchBtn.addEventListener('click', loadProducts);
  searchInput.addEventListener('keydown', ({key}) => {
    if (key === 'Enter')
      loadProducts();
  });
  const savedData = getSavedCartItems();
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
