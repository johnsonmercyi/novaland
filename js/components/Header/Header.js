class Header extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._showheadertext = true;
    this._stylesheet = './js/components/Header/style.css';
    this._logo = './img/logo.svg';
  }

  static get observedAttributes() {
    return ['showheadertext', 'stylesheet', 'logo'];
  }

  connectedCallback() {
    // This is called when the element is inserted into the DOM
    
    // Check the initial attribute value
    const showHeaderText = this.getAttribute('showHeaderText');
    this._showheadertext = showHeaderText !== 'false';
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this._logo = this.getAttribute('logo') || this._logo;

    this.render();
  }

  loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${this._stylesheet}`;
    link.type = 'text/css';
    this.shadowRoot.appendChild(link);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'showHeaderText') {
      this._showheadertext = newValue;
    } else if (name === 'stylesheet') {
      this._stylesheet = newValue;
    } else if (name === 'logo') {
      this._logo = newValue;
    }
    
    this.render();    
  }

  get showHeaderText() {
    return this._showheadertext;
  }

  set showHeaderText(value) {
    this._showheadertext = value;
    this.setAttribute("showHeaderText", value);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(value) {
    this._stylesheet = value;
    this.setAttribute("stylesheet", value);
    console.log("STYLE PATH: ", this._stylesheet);
  }

  get logo() {
    return this._logo;
  }

  set logo(value) {
    this._logo = value;
    this.setAttribute("logo", value);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .header {
          padding-top: ${!this._showheadertext ? '1rem' : '1.5rem'};
          height: ${!this._showheadertext ? '7rem' : '15rem'};
        }
      </style>
      <header class="header">
        <img src="${this._logo}" width="250vh"/>
        ${
          this._showheadertext ? `
            <h1>Coronavirus (COVID-19)</h1>
            <h4>Government Response to COVID-19</h4>
          ` : ``
        }
      </header>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-header', Header);