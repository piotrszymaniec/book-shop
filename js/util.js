export function createElement(tag, className = '', content = '') {
  const el = document.createElement(tag)
  if (className) {
    className.split(' ').forEach(cls =>
      el.classList.add(cls)
    )
  }
  el.textContent = content
  return el
}

export function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}