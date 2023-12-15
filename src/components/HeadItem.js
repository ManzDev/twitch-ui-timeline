class HeadItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --dark-color: #888;
      }

      .container {
        display: flex;
        justify-content: start;
        align-items: center;
        padding-left: 1rem;
        gap: 1rem;
        height: var(--row-size);
        position: relative;
      }

      .container::after {
        content: "";
        width: 75%;
        display: block;
        border-bottom: 1px solid #333;
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .avatar img {
        --size: 50px;

        width: var(--size);
        height: var(--size);
      }

      .data {
        font-family: var(--font-sans);
        color: #fff;

        & h1 {
          font-size: 1.25rem;
          margin: 0;
        }

        & span {
          font-size: 1rem;
          color: var(--dark-color);
        }
      }
    `;
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.image = `images/logos/${this.getAttribute("name").toLowerCase()}.svg`;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${HeadItem.styles}</style>
    <div class="container">
      <div class="avatar">
        <img src="${this.image}" alt="${this.name}">
      </div>
      <div class="data">
        <h1>${this.name}</h1>
        <span><slot></slot></span>
      </div>
    </div>`;
  }
}

customElements.define("head-item", HeadItem);
