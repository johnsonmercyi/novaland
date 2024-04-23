class Select extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._options = '[]';
    this._placeholder = "Select";
    this._value = "";
    this._name = "";
    this._label = "Label";
    this._showlabel = "true";
    this._stylesheet = "./js/components/ui/Select/style.css";
    this._error = "false";
    this._errorMessage = "Error message here...";
  }

  static get observedAttributes() {
    return ['options', 'placeholder', 'value', 'name', 'label', 'showlabel', 'stylesheet', 'error', 'errormessage'];
  }

  connectedCallback() {
    this._options = this.getAttribute('options') || this._options;
    this._placeholder = this.getAttribute('placeholder') || this._placeholder;
    this._name = this.getAttribute('name') || this._name;
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
    if (name === 'options') {
      this._options = newValue;
    } if (name === "placeholder") {
      this._placeholder = newValue;
    } else if (name === "value") {
      this._value = newValue;
    } else if (name === "name") {
      this._name = newValue;
    } else if (name === "label") {
      this._label = newValue;
    } else if (name === "showlabel") {
      this._showlabel = newValue;
    } else if (name === 'stylesheet') {
      this._stylesheet = newValue;
    } else if (name === "error") {
      this._error = newValue !== 'false';
    } else if (name === "errormessage") {
      this._errorMessage = newValue;
    }

    this.render();
  }

  loadStyle() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this._stylesheet);
    this.shadowRoot.appendChild(link);
  }

  get options() {
    return this._options;
  }

  set options(value) {
    this.setAttribute('options', value);
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get showlabel() {
    return this._showlabel;
  }

  set showlabel(value) {
    this.setAttribute("showlabel", value);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(value) {
    this.setAttribute("stylesheet", value);
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this.setAttribute("error", value);
  }

  get errormessage() {
    return this._errorMessage;
  }

  set errormessage(value) {
    this.setAttribute("errormessage", value);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyle();
    const options = JSON.parse(this._options);
    console.log("OPTIONS: ", options, options.length);
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="input-field-wrapper">
        ${
          this._showlabel ?
          `<label>${this._label}</label>` : ''
        }
        <select
          class="${this._error ? 'error' : ''}"
          name="${this._name}"
          placeholder="${this._placeholder}">
          <option value="" selected>-- ${this._label} --</option>

          ${
            options.length ? options.map(option =>`
              <option value="${option.value}" ${this._value === option.value ? "selected" : ""}>${option.label}</option>
            `).join(" ") : ``
          }
        </select>
        ${
          this._error ? `
            <span class="error-message">${this._errorMessage}</span>
          ` : ''
        }
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('.input-field-wrapper select')
    .addEventListener('change', (event)=> {
      this._value = event.target.value;
    });
  }
}

customElements.define('nova-select', Select)