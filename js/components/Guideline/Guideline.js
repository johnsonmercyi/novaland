class Guideline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._stylesheet = "./js/components/Guideline/style.css";
    this._content = [];
  }

  static get observedAttributes() {
    return ['content', 'stylesheet'];
  }

  get content() {
    return this._content;
  }

  set content(content) {
    this._content = content;
    this.setAttribute('content', content);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(stylesheet) {
    this._stylesheet = stylesheet;
    this.setAttribute('stylesheet', stylesheet);
  }

  connectedCallback() {
    this._content = this.getAttribute('content') || "[]";
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'content') {
      this._content = newValue;
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
      <div class="guideline">
        ${
          this._content?.length ? JSON.parse(this._content).map(content => {
            return `
                
              <img src="${content.image}" width="40rem"/>
              <h3>${content.title}</h3>
              <ul>
                  ${content.content.map(c => {
                      return `<li>${c.sub}</li>`
                  })}
              </ul>
            
            `
          }).join('') : ''
        }
      </div>        
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-guideline', Guideline);