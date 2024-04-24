class StatsCards extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._statstitle = '';
    this._weeklychangeno = '';
    this._total = '';
    this._stylesheet = './js/components/StatsCard/style.css';
  }

  static get observedAttributes() {
    return ['statstitle', 'weeklychangeno', 'total', 'stylesheet'];
  }

  connectedCallback() {
    // This is called when the element is inserted into the DOM
    this._statstitle = this.getAttribute('statstitle') || '';
    this._weeklychangeno = this.getAttribute('weeklychangeno') || '';
    this._total = this.getAttribute('total') || '';
    this._stylesheet = this.getAttribute('stylesheet') || this._stylesheet;
    this.render();
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "stylesheet") {
      this._stylesheet = newValue;
    } else if (name === "statstitle") {
      this._statstitle = newValue;
    } else if (name === "weeklychangeno") {
      this._weeklychangeno = newValue;
    } else if (name === "total") {
      this._total = newValue;
    }
    this.render();
  }

  set stylesheet(value) {
    this.setAttribute("stylesheet", value);
  }
  get stylesheet() {
    return this._stylesheet;
  }

  set statstitle(value) {
    this.setAttribute("statstitle", value);
  }
  get statstitle() {
    return this._statstitle;
  }
  set weeklychangeno(value) {
    this.setAttribute("weeklychangeno", value);
  }
  get weeklychangeno() {
    return this._weeklychangeno;
  }
  set total(value) {
    this.setAttribute("total", value);
  }
  get total() {
    return this._total;
  }


  loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = this._stylesheet;
    link.type = 'text/css';
    this.shadowRoot.appendChild(link);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyles();
    const template = document.createElement('template');
    template.innerHTML = `
            <div class="stats-card-wrapper">
                <div class="stats-card">
                    <div class="section-left">
                        <h3>${this._statstitle}</h3>
                        <div class="weeky-change">
                            <h5>Weekly Change</h5>
                            <span>${this._weeklychangeno}</span>
                        </div>
                    </div>
                    <div class="section-right">
                        <div class="total">
                            <h5>Total</h5>
                            <span>${this._total}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

}

customElements.define('stats-card', StatsCards);