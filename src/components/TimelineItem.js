const DEFAULT_WIDTH = 4;
const DEFAULT_START = 1;
const DEFAULT_COLOR = "#7048e8";

class TimelineItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        width: calc(var(--item-size) - 1rem);
        height: calc(var(--row-size) - 1.2rem);
        background-color: var(--item-color);
        border-radius: 0.5rem;
        overflow: hidden;
        display: grid;
        place-content: center;
        transform: translateX(calc(var(--item-offset) + 0.5rem));
        position: absolute;
        top: 0.6rem;
        box-shadow: 0 0 10px 5px #0002;

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
    this.start = this.getAttribute("start") ?? DEFAULT_START;
    this.width = this.getAttribute("width") ?? DEFAULT_WIDTH;
    this.color = this.getAttribute("color") ?? DEFAULT_COLOR;
    this.render();
    this.style.setProperty("--item-size", `calc(${this.width} * var(--column-size))`);
    this.style.setProperty("--item-offset", `calc(${this.start - 1} * var(--column-size))`);
    this.style.setProperty("--item-color", this.color);
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
