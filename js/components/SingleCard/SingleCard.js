class SingleCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._stylesheet = "./js/components/SingleCard/style.css";
    this._title = "";
    this._value = "";
  };

  static get observedAttributes() {
    return ['title', 'value', 'stylesheet'];
  };

  connectedCallback() {
    // This is called when the element is inserted into the DOM
    this._title = this.getAttribute('title') || '';
    this._value = this.getAttribute('value') || '';
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // This is called when an observed attribute changes
    if (name === 'title') {
      this._title = newValue;
    } else if (name === 'value') {
      this._value = newValue;
    } else if (name === 'stylesheet') {
      this._stylesheet = newValue;
    }
    this.render();
  }

  set stylesheet(value) {
    this.setAttribute('stylesheet', value);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get title() {
    return this._title;
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get value() {
    return this._value;
  }



  loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = this._stylesheet;
    this.shadowRoot.appendChild(link);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    const template = document.createElement('template');
    // console.log(checking, this._title, this._value);
    template.innerHTML = `
            <div class="single-card-wrapper">
                <div class="single-card">
                    <div class="section-up">
                        <h3>${this._title}</h3>
                    </div>
                    <div class="section-down">
                        <h5>Weekly Report</h5>
                        <span>${this._value}</span>
                    </div>
                </div>
            </div>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('single-card', SingleCard);