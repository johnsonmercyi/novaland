class TextField extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._placeholder = "Enter text";
    this._value = "";
    this._name = "";
    this._type = "text";
    this._label = "Label";
    this._showlabel = "true";
    this._stylesheet = "./js/components/ui/TextField/style.css";
    this._error = "false";
    this._errorMessage = "Error message here...";

    // this.onInputHandler = this.onInputHandler.bind(this);
  }

  loadStyles() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this._stylesheet);
    this.shadowRoot.appendChild(link);
  }

  static get observedAttributes() {
    return ['placeholder', 'value', 'name', 'type', 'label', 'showlabel', 'stylesheet', 'error', 'errormessage'];
  }

  connectedCallback() {
    this._placeholder = this.getAttribute('placeholder') || this._placeholder;
    this._value = this.getAttribute('value') || this._value;
    this._name = this.getAttribute('name') || this._name;
    this._type = this.getAttribute('type') || this._type;
    this._label = this.getAttribute('type') || this._label;
    const showLabel = this.getAttribute('showlabel') || this._showlabel;
    this._showlabel = showLabel !== 'false';
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    const error = this.getAttribute('error') || this._error;
    this._error = error !== 'false';
    this._errorMessage = this.getAttribute('errormessage') || this._errorMessage;
    
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // This is called when an observed attribute changes
    if (name === "placeholder") {
      this._placeholder = newValue;
    } else if (name === "value") {
      this._value = newValue;
    } else if (name === "name") {
      this._name = newValue;
    } else if (name === "type") {
      this._type = newValue;
    } else if (name === "label") {
      this._label = newValue;
    } else if (name === "showlabel") {
      this._showlabel = newValue !== 'false';
    } else if (name === "stylesheet") {
      this._stylesheet = newValue;
    } else if (name === "error") {
      this._error = newValue !== 'false';
    } else if (name === "errormessage") {
      this._errorMessage = newValue;
    }

    this.render();
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    // this._placeholder = value;
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    // this._value = value;
    this.setAttribute('value', value);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    // this._name = value;
    this.setAttribute('name', value);
  }

  get type() {
    return this._type;
  }

  set type(value) {
    // this._type = value;
    this.setAttribute('type', value);
  }

  get label() {
    return this._label;
  }

  set label(value) {
    // this._label = value;
    this.setAttribute('label', value);
  }

  get showlabel() {
    return this._showlabel;
  }

  set showlabel(value) {
    // this._showlabel = value !== 'false';
    this.setAttribute("showlabel", value);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(value) {
    // this._stylesheet = value;
    this.setAttribute("stylesheet", value);
  }

  get error() {
    return this._error;
  }

  set error(value) {
    // this._error = value !== 'false';
    this.setAttribute("error", value);
  }

  get errormessage() {
    return this._errorMessage;
  }

  set errormessage(value) {
    // this._errorMessage = value;
    this.setAttribute("errormessage", value);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .input-field-wrapper input[type="date"]::before,
        .input-field-wrapper input[type="time"]::before {
          content   : '${!this._value ? this._placeholder : ""}';
          width: ${!this._value ? 100 : 0}%;
          background: ${!this._value ? "white" : "none"};
        }
      </style>
      <div class="input-field-wrapper">
        ${
          this._showlabel ? 
          `<label>${this._label}</label>` : ''
        }
        
        <input
          class="${this._error ? 'error' : ''}"
          name="${this._name}"
          type="${this._type}"
          placeholder="${this._placeholder}" 
          value="${this._value}"/>
        ${
          this._error ? `
            <span class="error-message">${this._errorMessage}</span>
          ` : ''
        }
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.input-field-wrapper input').addEventListener('input', (e) => {
      this._value = e.target.value;
      console.log(this._value);

      /**
       * ⚠️This is not to be used.
       * It's buggy. It needs a quiet rendering of component to execute as expected.
       */
      // if (this._value) {
      //   this._error = 'false';
      //   this._errorMessage = '';
      //   console.log(this._error, this._errorMessage);
      // }
    });

    this.shadowRoot.querySelector('.input-field-wrapper input[type="date"]')
      && this.shadowRoot.querySelector('.input-field-wrapper input[type="date"]').addEventListener('input', (e) => {
      this.value = e.target.value;
    });

    this.shadowRoot.querySelector('.input-field-wrapper input[type="time"]')
      && this.shadowRoot.querySelector('.input-field-wrapper input[type="time"]').addEventListener('input', (e) => {
      this.value = e.target.value;
    });
  }
}

customElements.define('nova-field', TextField);