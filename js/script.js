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
  return bookContainer
}


function addBook(parentEl, book) {
  const fragment = new DocumentFragment()
  fragment.append(createBookElement(book))
  return parentEl.append(fragment)
}



const app = document.createElement('div')
app.setAttribute("id", "app")
document.body.append(app)



fetch('./data/books.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    data.map(createBookElement)
    data.forEach(element => {
      const bookContainer = new DocumentFragment()
      addBook(bookContainer, element)
      //show book row
      app.append(bookContainer)
    });
  });
