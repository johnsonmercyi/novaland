class BarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._stylesheet = "./js/components/Charts/style.css";
    this._data = '{}';
  }

  static get observedAttributes() {
    return ['stylesheet', 'data'];
  }

  connectedCallback() {
    this._stylesheet = this.getAttribute("stylesheet") || this._stylesheet;
    this._data = this.getAttribute("data") || this._data;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "stylesheet") {
      this._stylesheet = newValue;
    } else if (name === "data") {
      this._data = newValue;
    }
    this.render();
  }

  get stylesheet() {
    return this.stylesheet;
  }

  set stylesheet(value) {
    this.setAttribute('stylesheet', value);
  }

  get data() {
    return this.data;
  }

  set data(value) {
    this.setAttribute('data', value);
  }

  loadStyle() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this._stylesheet);
    this.shadowRoot.appendChild(link);
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.loadStyle();

    const { chart, ruler, keys } = JSON.parse(this._data);
    console.log(this._data, chart, ruler, keys);

    const template = document.createElement('template');
    template.innerHTML = `
      <div class="bar-chart-container">
        <div class="bar-chart">
          <div class="ruler">
            ${
              ruler && (ruler?.labels.length ? ruler.labels.reverse().map((label, index) => `
                <div class="point point-${index + 1}">
                  <span style="background-color: ${label.bg}">${label.text}</span>
                </div>
              `).join(" ") : '')
            }
          </div>
          <div class="bars-container">
            ${
              chart && (chart.length ? chart.map((bar, index) => `
                <div class="bar bar-${index + 1}" style="height: ${bar.level}%">
                  <span class="bar-label" style="margin-top: 0.5rem">${bar.label}</span>
                </div>
              `).join(" ") : '')
            }
          </div>
        </div>
        <div class="key-container">
          ${
            keys && (keys.length ? keys.reverse().map((key, index)=> `
              <div class="key key-${index + 1}">
                <div class="indicator" style="background-color: ${key.bg}"></div>
                <span>${key.text}</span>
              </div>
            `).join(" ") : '')
          }
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('nova-bar-chart', BarChart);