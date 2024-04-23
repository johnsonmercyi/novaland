class Intro extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._textheader = '';
    this._textbody = '';
  }

  static get observedAttributes() {
    return ['textheader', 'textbody'];
  }

  get textheader() {
    return this._textheader;
  }

  set textheader(value) {
    this._textheader = value;
    this.setAttribute('textheader', value);
  }

  get textbody() {
    return this._textbody;
  }

  set textbody(value) {
    this._textbody = value;
    this.setAttribute('textbody', value);
  }

  connectedCallback() {
    // This is called when the element is inserted into the DOM
    this._textheader = this.getAttribute('textheader') || '';
    this._textbody = this.getAttribute('textbody') || '';
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'textheader') {
      this._textheader = newValue;
    } else if (name === 'textbody') {
      this._textbody = newValue;
    }

    this.render();
  }

  loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './js/components/Intro/style.css';
    link.type = 'text/css';
    this.shadowRoot.appendChild(link);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    const template = document.createElement('template');
    template.innerHTML = `
          <div class="intro">
            <h1>${this._textheader}</h1>
            <p class="body">${this._textbody}</p>
          </div>
        `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-intro', Intro);