class Form extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._stylesheet = "./js/components/Form/style.css";
    this._formtitle = "Form Title";
  }

  static get observedAttributes() {
    return ['stylesheet', 'formtitle'];
  }

  connectedCallback() {
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this._formtitle = this.getAttribute('formtitle') || this._formtitle;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "stylesheet") {
      this._stylesheet = newValue;
    } else if (name === "formtitle") {
      this._formtitle = newValue;
    }

    this.render();
  }

  loadStyle() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this._stylesheet);
    this.shadowRoot.appendChild(link);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(value) {
    this._stylesheet = value;
    this.setAttribute('stylesheet', value);
  }

  get formtitle() {
    return this._formtitle;
  }

  set formtitle(value) {
    this._formtitle = value;
    this.setAttribute('formtitle', value);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyle();
    const template = document.createElement('template');
    template.innerHTML = `
      <form class="form">
        <header>
          <h2>${this._formtitle}</h2>
        </header>
        <div class="main">
          <slot></slot>
        </div>
      </form>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-form', Form);