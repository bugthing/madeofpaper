import '../css/common.css';


function component() {
  let element = document.createElement('div');
  element.classList.add('info');
  element.innerHTML = `
    <h1>Application</h1>
  `.trim()
  return element;
}

document.body.appendChild(component());
