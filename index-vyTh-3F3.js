(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const d=20,m=()=>{const r=[];for(let i=0;i<d;i++)r.push(`<div class="number">${i+1}</div>`);return r.join("")};class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.name=this.getAttribute("name"),this.image=`images/logos/${this.getAttribute("name").toLowerCase()}.svg`,this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${o.styles}</style>
    <div class="container">
      <div class="avatar">
        <img src="${this.image}" alt="${this.name}">
      </div>
      <div class="data">
        <h1>${this.name}</h1>
        <span><slot></slot></span>
      </div>
    </div>`}}customElements.define("head-item",o);const h=4,p=1,f="#7048e8";class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.start=this.getAttribute("start")??p,this.width=this.getAttribute("width")??h,this.color=this.getAttribute("color")??f,this.render(),this.style.setProperty("--item-size",`calc(${this.width} * var(--column-size))`),this.style.setProperty("--item-offset",`calc(${this.start-1} * var(--column-size))`),this.style.setProperty("--item-color",this.color)}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
      <h1>Texto del item</h1>
      <span>Subtexto del item</span>
    </div>`}}customElements.define("timeline-item",a);class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
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
          ${m()}
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
    </div>`}}customElements.define("ui-timeline",n);
