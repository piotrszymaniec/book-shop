const app = document.createElement('div')
app.setAttribute("id", "app")
document.body.append(app)
const cartItems = []
// {
//   "author": "Douglas Crockford",
//   "imageLink": "../img/book_001.webp",
//   "title": "JavaScript: The Good Parts: The Good Parts",
//   "price": 30,
//   "description": "With JavaScript: The Good Parts, you'll discover a beautiful, elegant, lightweight and highly expressive language that lets you create effective code, whether you're managing object libraries or just trying to get Ajax to run fast. If you develop sites or applications for the Web, this book is an absolute must"
// }


function createElement(tag, className = '', content = '') {
  const el = document.createElement(tag)
  if (className) {
    el.classList.add(className)
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


function createBookElement({ author, imageLink, title, price, description }) {
  const bookContainer = createElement('div', 'book')
  bookContainer.append(createImg('imageLink', imageLink, title))
  bookContainer.append(createElement('div', 'author', author))
  bookContainer.append(createElement('div', 'title', title))
  bookContainer.append(createElement('div', 'price', price))
  bookContainer.append(createElement('div', 'description', description))
  const showMoreBtn = createElement('button', 'show-more', 'Show more...')
  showMoreBtn.addEventListener('click', () => { console.log('show more clicked') })
  bookContainer.append(showMoreBtn)
  const addToCartBtn = createElement('button', 'add-to-cart', 'Add to Cart')
  addToCartBtn.addEventListener('click', () => {
    console.log('added ', title, ' to cart')
    addToCart({ author, title, price }, cartItems)
    console.log(cartItems)
    updateCart(cartItems)
  })
  bookContainer.append(addToCartBtn)

  return bookContainer
}

function createCartElement({ author, imageLink, title, price }) {
  const cartElement = createElement('div', 'book')
  // cartElement.append(createImg('imageLink', imageLink, title))
  cartElement.append(createElement('div', 'author', author))
  cartElement.append(createElement('div', 'title', title))
  cartElement.append(createElement('div', 'price', price))
  const removeBtn = createElement('button', 'remove-from-cart', 'Remove')
  removeBtn.addEventListener('click', (e) => {
    removeFromCart(cartItems, title)
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

function removeFromCart(cartItems, title) {
  console.log('Removing from cart. To implement')

}

function createCart(cartItems) {
  const fragment = new DocumentFragment()
  const cart = createElement('div', 'cart', '')
  const cartItemsContainer = createElement('div', 'cart-container', 'Empty')
  cart.append(createElement('h2', 'cart-title', 'Cart'))
  fragment.append(cart)
  cart.append(cartItemsContainer)
  return fragment
  parentEl.append(fragment)
  updateCart(cartItems)
}

function updateCart(cartItems = []) {
  const cartContainer = document.querySelector('.cart-container')
  cartContainer.textContent = ''
  const fragment = new DocumentFragment()
  console.log(cartItems)
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

