const createElement = (obj) => {
  const elem = document.createElement(`${obj.tagName}`);
  if (obj.className) {
    elem.classList.add(`${obj.className}`);
  }
  if (obj.text) {
    elem.innerText = `${obj.text}`;
  }
  return elem;
}

export default createElement;