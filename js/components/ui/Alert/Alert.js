import { getDarkerColor, hexToHSL } from "../../../config/utility.mjs";

class Alert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._type = 'success';
    this._message = '';
    this._stylesheet = './js/components/ui/Alert/style.css';
  }

  static get observedAttributes() {
    return ['type', 'message', 'stylesheet'];
  }

  connectedCallback() {
    this._type = this.getAttribute('type') || this._type;
    this._message = this.getAttribute('message') || this._message;
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      this._type = newValue;
    } else if (name === 'message') {
      this._message = newValue;
    } else if (name === 'stylesheet') {
      this._stylesheet = newValue;
    }
    
    this.render();
  }

  get type() {
    return this._type;
  }

  set type(type) {
    this.setAttribute('type', type);
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this.setAttribute('message', message);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(stylesheet) {
    this.setAttribute('stylesheet', stylesheet);
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

    console.log("LOG: ", this._message);

    const alertIcon = () => {
      let icon = "./img/success.svg";
      if (this._type === 'warning') {
        icon = "./img/warning.svg";
      } else if (this._type === 'error') {
        icon = "./img/error.svg"
      }
      return icon;
    }

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        div.alert {
          background-color: ${ 
            this.type === 'success' ? `hsl(134, 41%, 88%)` :
            this.type === 'error' ? `hsl(355, 70%, 91%)` : ``
          };
        }

        div.alert.error {
          color: #721c24;
        }

        div.alert.success {
          color: #155624;
        }
      </style>
      <div class="alert ${this._type}">
        <img src="${alertIcon()}" width="35rem"/>
        <p>${this._message}</p>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-alert', Alert);