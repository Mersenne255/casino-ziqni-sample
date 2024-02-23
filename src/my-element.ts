import {css, html, LitElement, nothing} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {ZiqniService} from "./ziqni-service.ts";

@customElement('my-element')
export class MyElement extends LitElement {
  @state() showWidget = false;
  private userToken?: string;

  connectedCallback() {
    super.connectedCallback();
    this._doBootstrapForLoggedInUser();
  }

  private _doBootstrapForLoggedInUser(){
    let ziqniService = new ZiqniService();
    ziqniService.initialize();
    this.userToken = ziqniService.getUserToken();
  }

  private _showWidget(){
    if(this.userToken){
      this.showWidget = !this.showWidget;
    } else {
      alert('Missing "token" parameter in the url')
    }
  }

  render() {
    return html`
      Casino main page
      ${this.showWidget && this.userToken ? html`<div class="widgetPanel">
        <div style="position: absolute; right: 0; top: 0; height: 50px; width: 50px;" @click=${() => this.showWidget = false}></div>
        <iframe class="widgetFrame" src=${`ziqni-widget.html?token=${this.userToken}`}></iframe>
      </div>` : nothing}
      <div class="widgetButton" @click=${this._showWidget}>T</div>
    `
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .widgetPanel{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    
    .widgetFrame{
      border: none;
      width: 100%;
      height: 100%;
    }

    .widgetButton {
      position: absolute;
      bottom: 0;
      background: #2129e5;
      height: 50px;
      width: 50px;
      border-radius: 50px;
      display: grid;
      place-items: center;
      font-size: 30px;
    }

  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
