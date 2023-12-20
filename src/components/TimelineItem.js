const DEFAULT_WIDTH = 4;
const DEFAULT_START = 1;
const DEFAULT_COLOR = "#7048e8";

const MAX_SIZE = 100;
const MIN_SIZE = 2;

const MAX_OFFSET = 100;
const MIN_OFFSET = 1;

class TimelineItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: grid;
        background: color-mix(in srgb, var(--item-color), black 20%);
        width: calc(var(--item-size) - 1rem);
        height: calc(var(--row-size) - 1.2rem);
        transform: translateX(calc(var(--item-offset) + 0.5rem));
        border-radius: 0.5rem;
        box-shadow: 0 0 10px 5px #0002;
        position: absolute;
      }

      .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: grid;
        place-content: center;

        & h1 {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 1.25rem;
          color: #fff;
          margin: 0;
          line-height: 90%;
        }

        & span {
          font-family: var(--font-sans);
          font-weight: 375;
          letter-spacing: 0.5px;
          font-size: 1rem;
          color: #999;
          display: block;
          line-height: 90%;
        }
      }
    `;
  }

  connectedCallback() {
    this.start = parseInt(this.getAttribute("start")) ?? DEFAULT_START;
    this.width = parseInt(this.getAttribute("width")) ?? DEFAULT_WIDTH;
    this.color = this.getAttribute("color") ?? DEFAULT_COLOR;
    this.render();

    this.update();

    this.style.setProperty("--item-size", "calc(var(--item-width) * var(--column-size))");
    this.style.setProperty("--item-offset", "calc(calc(var(--item-start) - 1) * var(--column-size))");
    this.style.setProperty("--item-color", this.color);
  }

  setSize(step = 1) {
    this.width = Math.min(Math.max(MIN_SIZE, this.width + step), MAX_SIZE);
    this.update();
  }

  setOffset(step = 1) {
    this.start = Math.min(Math.max(MIN_OFFSET, this.start + step), MAX_OFFSET);
    this.update();
  }

  update() {
    this.style.setProperty("--item-width", this.width);
    this.style.setProperty("--item-start", this.start);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${TimelineItem.styles}</style>
    <div class="container">
      <h1>Texto del item</h1>
      <span>Subtexto del item</span>
    </div>`;
  }
}

customElements.define("timeline-item", TimelineItem);
