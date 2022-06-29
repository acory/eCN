import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-ripple/paper-ripple.js';

import {navMenuStyles} from './styles/nav-menu-styles';
import {fireEvent} from '../../utils/fire-custom-event';
import {ROOT_PATH, SMALL_MENU_ACTIVE_LOCALSTORAGE_KEY} from '../../../config/config';
import {customElement, html, LitElement, property} from 'lit-element';
import {translate} from 'lit-translate';
import {store} from '../../../redux/store';
import {updateSmallMenu} from '../../../redux/actions/app';

/**
 * main menu
 * @LitElement
 * @customElement
 */
@customElement('app-menu')
export class AppMenu extends LitElement {
  static get styles() {
    return [navMenuStyles];
  }

  public render() {
    // main template
    // language=HTML
    return html`
      <div class="menu-header">
        <span id="app-name"> eCN </span>

        <span class="ripple-wrapper main">
          <iron-icon
            id="menu-header-top-icon"
            icon="assignment-ind"
            @tap="${() => this._toggleSmallMenu()}"
          ></iron-icon>
          <paper-ripple class="circle" center></paper-ripple>
        </span>
        <paper-tooltip for="menu-header-top-icon" position="right"> eCN </paper-tooltip>

        <span class="chev-right">
          <iron-icon id="expand-menu" icon="chevron-right" @tap="${() => this._toggleSmallMenu()}"></iron-icon>
          <paper-ripple class="circle" center></paper-ripple>
        </span>

        <span class="ripple-wrapper">
          <iron-icon id="minimize-menu" icon="chevron-left" @tap="${() => this._toggleSmallMenu()}"></iron-icon>
          <paper-ripple class="circle" center></paper-ripple>
        </span>
      </div>

      <div class="nav-menu">
        <iron-selector
          .selected="${this.selectedOption}"
          attr-for-selected="menu-name"
          selectable="a"
          role="navigation"
        >
          <a class="nav-menu-item" menu-name="interventions" href="${this.rootPath + 'interventions'}">
            <iron-icon id="page1-icon" icon="accessibility"></iron-icon>
            <paper-tooltip for="page1-icon" position="right"> PDs/SPDs </paper-tooltip>
            <div class="name">PDs/SPDs</div>
          </a>
        </iron-selector>

        <div class="nav-menu-item section-title">
          <span>${translate('COMMUNITY_CHANNELS')}</span>
        </div>

        <a class="nav-menu-item lighter-item" href="http://etools.zendesk.com" target="_blank">
          <iron-icon id="knoledge-icon" icon="maps:local-library"></iron-icon>
          <paper-tooltip for="knoledge-icon" position="right">${translate('KNOLEDGE_BASE')}</paper-tooltip>
          <div class="name">${translate('KNOLEDGE_BASE')}</div>
        </a>

        <a
          class="nav-menu-item lighter-item"
          href="https://www.yammer.com/unicef.org/#/threads/inGroup?type=in_group&feedId=5782560"
          target="_blank"
        >
          <iron-icon id="discussion-icon" icon="icons:question-answer"></iron-icon>
          <paper-tooltip for="discussion-icon" position="right">${translate('DISCUSSION')}</paper-tooltip>
          <div class="name">${translate('DISCUSSION')}</div>
        </a>

        <a class="nav-menu-item lighter-item last-one" href="https://etools.unicef.org/landing" target="_blank">
          <iron-icon id="information-icon" icon="icons:info"></iron-icon>
          <paper-tooltip for="information-icon" position="right">${translate('INFORMATION')}</paper-tooltip>
          <div class="name">${translate('INFORMATION')}</div>
        </a>
      </div>
    `;
  }

  @property({type: String, attribute: 'selected-option'})
  public selectedOption = '';

  @property({type: String})
  rootPath: string = ROOT_PATH;

  @property({type: Boolean, attribute: 'small-menu'})
  public smallMenu = false;

  public _toggleSmallMenu(): void {
    this.smallMenu = !this.smallMenu;
    const localStorageVal: number = this.smallMenu ? 1 : 0;
    localStorage.setItem(SMALL_MENU_ACTIVE_LOCALSTORAGE_KEY, String(localStorageVal));
    store.dispatch(updateSmallMenu(this.smallMenu));
    fireEvent(this, 'toggle-small-menu', {value: this.smallMenu});
  }
}
