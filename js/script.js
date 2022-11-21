const app = document.createElement('div')
app.setAttribute("id", "app")
document.body.append(app)
const cartItems = []
const cartIndex = 0;

function createElement(tag, className = '', content = '') {
  const el = document.createElement(tag)
  if (className) {
    className.split(' ').forEach(cls =>
      el.classList.add(cls)
    )
  }
  el.textContent = content
  return el
}

function createImg(className, src, altName) {
  const imgEl = createElement('img', className)
  imgEl.setAttribute('src', src)
  imgEl.setAttribute('alt', altName + 'book image')
  return imgEl
}

function createPopup(content) {
  const el = createElement('div', 'popup hidden description')
  const descr = createElement('div', 'description-content', content)
  const closeCrossBtn = createElement('button', 'close-popup-x', '✖')
  const closeBtn = createElement('button', 'close-popup-button', 'close')
  closeBtn.addEventListener('click', () => {
    el.classList.add('hidden')
  })
  closeCrossBtn.addEventListener('click', () => {
    el.classList.add('hidden')
  })
  el.append(closeCrossBtn)
  el.append(descr)
  el.append(closeBtn)
  return el
}

function createBookElement({ author, imageLink, title, price, description }) {
  const bookContainer = createElement('div', 'book')
  bookContainer.append(createImg('imageLink', imageLink, title))
  bookContainer.append(createElement('div', 'author', author))
  bookContainer.append(createElement('div', 'title', title))
  bookContainer.append(createElement('div', 'price', price))
  // const descriptionPopup = createElement('div', 'description popup hidden', description)
  const popup = createPopup(description)
  bookContainer.append(popup)
  const showMoreBtn = createElement('button', 'show-more', 'Show more...')
  showMoreBtn.addEventListener('click', () => {
    popup.classList.remove('hidden')
    popup.querySelector('.close-popup-button').focus()
    console.log('show more clicked')
  })
  bookContainer.append(showMoreBtn)
  const addToCartBtn = createElement('button', 'add-to-cart', 'Add to Cart')
  addToCartBtn.addEventListener('click', () => {
    console.log('added ', title, ' to cart')
    addToCart({ id: cartItems.length, author, title, price }, cartItems)
    updateCart(cartItems)
  })
  bookContainer.append(addToCartBtn)

  return bookContainer
}

function createCartElement({ id, author, title, price }) {
  const cartElement = createElement('div', 'book')
  // cartElement.append(createImg('imageLink', imageLink, title))
  cartElement.append(createElement('div', 'author', author))
  cartElement.append(createElement('div', 'title', title))
  cartElement.append(createElement('div', 'price', price))
  const removeBtn = createElement('button', 'remove-from-cart', '✖')
  removeBtn.addEventListener('click', () => {
    removeFromCart(id)
    updateCart(cartItems)
  })
  cartElement.append(removeBtn)

  return cartElement
}



function addBook(parentEl, book) {
  const fragment = new DocumentFragment()
  fragment.append(createBookElement(book))
  return parentEl.append(fragment)
}

function addToCart(item, cartItems) {
  cartItems.push(item)
  console.log('Cart Contents:');
  cartItems.forEach(orderItem => {
    console.log(orderItem);
  }
  )
}

function removeFromCart(id) {
  console.log('Removing from cart', id)
  const itemIndex = cartItems.findIndex((item) => item.id == id)
  cartItems.splice(itemIndex, 1)
}

function createCart(cartItems) {
  const fragment = new DocumentFragment()
  const cart = createElement('div', 'cart', '')
  const cartItemsContainer = createElement('div', 'cart-container', 'Empty')
  cart.append(createElement('h2', 'cart-title', 'Cart'))
  fragment.append(cart)
  cart.append(cartItemsContainer)
  return fragment
}

function updateCart(cartItems = []) {
  const cartContainer = document.querySelector('.cart-container')
  cartContainer.textContent = ''
  const fragment = new DocumentFragment()
  cartItems.forEach(cartItem => {
    fragment.append(createCartElement(cartItem))
    cartContainer.append(fragment)
  })
}


fetch('./data/books.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    const bookContainer = createElement('div', 'book-container')
    const fragment = new DocumentFragment()
    data.forEach(element => {
      addBook(bookContainer, element)
      //show book row
    });
    fragment.append(bookContainer)
    app.append(fragment)
    app.append(createCart(data))
  });

