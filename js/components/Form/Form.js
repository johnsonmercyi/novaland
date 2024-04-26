import '../ui/Alert/Alert.js';

class Form extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._stylesheet = "./js/components/Form/style.css";
    this._formtitle = "Form Title";
    this._alertform = 'false';
    this._alertformtype = 'success';
    this._alertformmessage = "Message comes in here...";
  }

  static get observedAttributes() {
    return ['stylesheet', 'formtitle', 'alertform', 'alertformtype','alertformmessage'];
  }

  connectedCallback() {
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this._formtitle = this.getAttribute('formtitle') || this._formtitle;
    const alertForm = this.getAttribute('alertform') || this._alertform;
    this._alertform = alertForm !== 'false';
    this._alertformtype = this.getAttribute('alertformtype') || this._alertformtype;
    this._alertformmessage = this.getAttribute('alertformmessage') || this._alertformmessage;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "stylesheet") {
      this._stylesheet = newValue;
    } else if (name === "formtitle") {
      this._formtitle = newValue;
    } else if (name === "alertform") {
      this._alertform = newValue !== 'false';
    } else if (name === "alertformtype") {
      this._alertformtype = newValue;
    } else if (name === "alertformmessage") {
      this._alertformmessage = newValue;
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
    this.setAttribute('stylesheet', value);
  }

  get formtitle() {
    return this._formtitle;
  }

  set formtitle(value) {
    this.setAttribute('formtitle', value);
  }

  get alertform() {
    return this._alertform;
  }

  set alertform(value) {
    this.setAttribute('alertform', value);
  }

  get alertformtype() {
    return this._alertformtype;
  }

  set alertformtype(value) {
    this.setAttribute('alertformtype', value);
  }

  get alertformmessage() {
    return this._alertformmessage;
  }

  set alertformmessage(value) {
    this.setAttribute('alertformmessage', value);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyle();

    console.log("SHOW TEST: ", this._alertform);
    const template = document.createElement('template');
    template.innerHTML = `
      <form class="form">
        <header>
          <h2>${this._formtitle}</h2>
        </header>
        ${
          this._alertform ? `
            <nova-alert 
              type="${this._alertformtype}"
              message="${this._alertformmessage}"></nova-alert>
          ` : ''
        }
        <div class="main">
          <slot></slot>
        </div>
      </form>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-form', Form);