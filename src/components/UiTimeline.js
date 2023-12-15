import { renderCount } from "@/modules/renderCount.js";
import "@/components/HeadItem.js";
import "@/components/TimelineItem.js";

class UiTimeline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --header-size: 250px;
      }

      .container {
        display: grid;
        grid-template-columns: var(--header-size) 1fr;
        min-height: 600px;
        background-color: #212226;
        /* overflow-x: scroll; */
      }

      .container > div {
        height: 100%;

        & header {

          min-height: 75px;
        }
      }

      .timeline-body {
        background-image: repeating-linear-gradient(
          to right,
          #333 0 1px,
          transparent 1px var(--column-size)
        );
      }

      .timeline-body header {
        display: flex;
        background: var(--bgcolor);

        & .number {
          font-family: var(--font-sans);
          color: #ccc;
          width: var(--column-size);
          display: grid;
          place-items: center;
        }
      }

      .timeline-body .track {
        height: var(--row-size);
        border-bottom: 1px solid transparent;
        box-sizing: border-box;
        display: grid;
        align-items: center;
        position: relative;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${UiTimeline.styles}</style>
    <div class="container">
      <div class="timeline-header">
        <header></header>
        <head-item name="HTML">Lenguaje de marcado</head-item>
        <head-item name="CSS">Lenguaje de estilos</head-item>
        <head-item name="Javascript">Programación cliente</head-item>
        <head-item name="Webcomponents">Componentes web</head-item>
        <head-item name="Terminal">Terminal</head-item>
      </div>
      <div class="timeline-body">
        <header>
          ${renderCount()}
        </header>
        <div class="track">
          <timeline-item start="2" width="4"></timeline-item>
          <timeline-item start="6" width="4" color="black"></timeline-item>
        </div>
        <div class="track">
          <timeline-item start="3" width="5" color="indigo"></timeline-item>
        </div>
        <div class="track">
          <timeline-item start="8" width="14"></timeline-item>
        </div>
        <div class="track">

        </div>
        <div class="track">
          <timeline-item start="6" width="4"></timeline-item>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("ui-timeline", UiTimeline);
