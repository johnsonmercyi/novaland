class Menu extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._menuImage = "";
    this._menuText = "";
    this._menuLink = "#";
  }

  static get observedAttributes() {
    return ['menuImage', 'menuText', 'menuLink'];
  }

  connectedCallback() {
    // This is called when the element is inserted into the DOM
    this.loadStyles();
    this._menuImage = this.getAttribute("menuImage");
    this._menuText = this.getAttribute("menuText");
    this._menuLink = this.getAttribute("menuLink");
    this.render();
  }

  loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './js/components/ui/Menu/style.css';
    link.type = 'text/css';
    this.shadowRoot.appendChild(link);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'menuImage') {
      this._menuImage = newValue;
    } else if (name === 'menuText') {
      this._menuText = newValue;
    } else if (name === 'menuLink') {
      this._menuLink = newValue;
    }

    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    this.render();
  }

  get menuImage() {
    return this._menuImage;
  }

  set menuImage(value) {
    this._menuImage = value;
    this.setAttribute("menuImage", value);
  }

  get menuText() {
    return this._menuText;
  }

  set menuText(value) {
    this._menuText = value;
    this.setAttribute("menuText", value);
  }

  get menuLink() {
    return this._menuLink;
  }

  set menuLink(value) {
    this._menuLink = value;
    this.setAttribute("menuLink", value);
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <a href="${this._menuLink}">
        <div class="menu">
          <div class="img-wrapper">
            <img src="${this._menuImage}"/>
          </div>
          <span>${this._menuText}</span>
        </div>
      </a>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-menu', Menu);