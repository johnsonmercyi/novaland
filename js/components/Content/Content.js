class Content extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._stylesheet = "./js/components/Content/style.css";
    this._subtopics = [];
  }

  static get observedAttributes() {
    return ['subtopics', 'stylesheet'];
  }

  get subtopics() {
    return this._subtopics;
  }

  set subtopics(subtopics) {
    this._subtopics = subtopics;
    this.setAttribute('subtopics', subtopics);
  }

  get stylesheet() {
    return this._stylesheet;
  }

  set stylesheet(stylesheet) {
    this._stylesheet = stylesheet;
    this.setAttribute('stylesheet', stylesheet);
  }

  connectedCallback() {
    this._subtopics = this.getAttribute('subtopics') || "[]";
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'subtopics') {
      this._subtopics = newValue;
    } else if (name === "stylesheet") {
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
      ${
        this._subtopics?.length ? JSON.parse(this._subtopics).map(page => {
          return `
            <div class="content" id="${page.id}">
              <h2>${page.header}</h2>
              ${
                String(page.body).slice(0, 4) === "<ul>" ? `
                  <div class="ul-body">${page.body}</div>
                ` : `
                  <p>${page.body}</p>
                `
              }
            </div>
          `;
        }).join('') : ''
      }    
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-content', Content);