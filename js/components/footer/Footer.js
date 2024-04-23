class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._socials = [];
    this._copyright = '';
  }

  static get observedAttributes() {
    return ['socials', 'copyright', 'link'];
  }

  get socials() {
    return this._socials;
  }

  set socials(socials) {
    this._socials = socials;
    this.setAttribute('socials', socials);
  }

  get copyright() {
    return this._copyright;
  }

  set copyright(copyright) {
    this._copyright = copyright;
    this.setAttribute('copyright', copyright);
  }

  connectedCallback() {
    this.loadStyles();
    this._socials = this.getAttribute('socials') || JSON.stringify([
      {
        src: "./img/facebook.svg",
        link: "https://www.facebook.com",
        width: "30rem"
      }, {
        src: "./img/twitter.svg",
        link: "https://www.x.com",
        width: "30rem"
      }, {
        src: "./img/youtube.svg",
        link: "https://www.youtube.com",
        width: "45rem"
      }
    ]);
    
    this._copyright = this.getAttribute('copyright');
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'socials') {
      this._socials = newValue;
    } else if (name === 'copyright') {
      this._copyright = newValue;
    }

    this.render();
  }

  loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './js/components/footer/style.css';
    link.type = 'text/css';
    this.shadowRoot.appendChild(link);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    const template = document.createElement('template');
    template.innerHTML = `
      <footer class="footer">
        <div class="social-icons">
          ${
            this._socials?.length ? JSON.parse(this._socials).map(icon => {
              return `
                <a href="${icon.link}" target="_blank">
                  <img src=${icon.src} width=${icon.width}/>
                </a>
              `
            }).join('') : ''
          }
        </div>
        <span>${this._copyright}</span>
      </footer>
    `;
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-footer', Footer)