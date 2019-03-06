function component() {
  let element = document.createElement('div');

  element.innerHTML = 'Content from JS land baby!';

  return element;
}

document.body.appendChild(component());
