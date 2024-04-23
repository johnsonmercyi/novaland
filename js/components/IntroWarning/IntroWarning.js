class IntroWarning extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._stylesheet = './js/components/IntroWarning/style.css';
    this._icon = '';
    this._text = '';
  }

  static get observedAttributes() {
    return ['icon', 'text', 'stylesheet'];
  }

  get icon() {
    return this._icon;
  }

  set icon(icon) {
    this._icon = icon;
    this.setAttribute('icon', icon);
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
    this.setAttribute('text', text);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(stylesheet) {
    this._stylesheet = stylesheet;
    this.setAttribute('stylesheet', stylesheet);
  }

  connectedCallback() {
    this._icon = this.getAttribute('icon') || this._icon;
    this._text = this.getAttribute('text') || this._text;
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'icon') {
      this._icon = newValue;
    } else if (name === 'text') {
      this._text = newValue;
    } else if (name === 'stylesheet') {
      this._stylesheet = newValue;
    }
    this.render();
  }

  loadStyles() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this._stylesheet);
    this.shadowRoot.appendChild(link);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    
    const template = document.createElement('template');
    template.innerHTML = `
            <div class="intro-warning">
                <img src="${this._icon}" />
                <span>${this._text}</span>
            </div>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('nova-introwarning', IntroWarning);