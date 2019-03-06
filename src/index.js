import './style.css';

function component() {
  let element = document.createElement('div');
  element.classList.add('info');
  element.innerHTML = `
    <h1>MadeOfPaper</h1>
    <p>
      Software consultancy &amp; development <i>starts on paper</i>
    </p>
    <p><a href="mailto:ben@madeofpaper.co.uk">Contact</a>
    <p><a href="https://github.com/bugthing/">Code</a>
    <p><a href="http://bugthing.github.io/">Notes</a>
  `.trim()
  return element;
}

document.body.appendChild(component());
