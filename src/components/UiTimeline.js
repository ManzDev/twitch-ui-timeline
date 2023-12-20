import { renderCount } from "@/modules/renderCount.js";
import "@/components/HeadItem.js";
import "@/components/TimelineItem.js";

const DEFAULT_COLUMN_SIZE = 75;
const STEP_ZOOM = 10;
const MIN_ZOOM = 40;
const MAX_ZOOM = 200;
const STEP_SIZE = 1;
const STEP_OFFSET = 1;

class UiTimeline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        /* --column-size: 75px; */
        --row-size: 75px;
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

      /*
      .timeline-header {
        position: sticky;
        z-index: 10;
        background: #212226;
      }
      */

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
          transition: width 0.5s;
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

      timeline-item:hover {
        z-index: 10;
        cursor: pointer;
        outline: 4px solid white;
      }
    `;
  }

  connectedCallback() {
    this.style.setProperty("--column-size", `${DEFAULT_COLUMN_SIZE}px`);
    this.render();
    this.addEventListener("wheel", (ev) => this.onWheel(ev));
  }

  onWheel(ev) {
    const path = ev.composedPath();
    const isTimelineItem = path.some(item => item.nodeName === "TIMELINE-ITEM");
    const isTimelineTrack = path.every(item => item.nodeName !== "TIMELINE-ITEM");
    const isDown = ev.deltaY > 0;

    if (isTimelineTrack) {
      ev.preventDefault();
      const columnSize = this.style.getPropertyValue("--column-size");
      const quantity = isDown ? -STEP_ZOOM : STEP_ZOOM;
      const newsize = Math.min(Math.max(MIN_ZOOM, parseInt(columnSize) + quantity), MAX_ZOOM);
      this.style.setProperty("--column-size", `${newsize}px`);
    }

    if (isTimelineItem) {
      ev.preventDefault();
      const item = path.find(item => item.nodeName === "TIMELINE-ITEM");
      const isCtrl = ev.ctrlKey;

      if (!isCtrl) {
        item.setSize(isDown ? -1 : 1);
      } else {
        item.setOffset(isDown ? -1 : 1);
      }
    }
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
          <timeline-item start="2" width="3"></timeline-item>
          <timeline-item start="5" width="4" color="black"></timeline-item>
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
