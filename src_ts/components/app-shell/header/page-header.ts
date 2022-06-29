import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button/paper-icon-button';
import '@unicef-polymer/etools-profile-dropdown/etools-profile-dropdown';
import '@unicef-polymer/etools-dropdown/etools-dropdown.js';
import {customElement, LitElement, html, property} from 'lit-element';

import './countries-dropdown';

import {connect} from 'pwa-helpers/connect-mixin.js';
import {RootState, store} from '../../../redux/store';
import {isProductionServer, ROOT_PATH} from '../../../config/config';
import {updateDrawerState} from '../../../redux/actions/app';
import {fireEvent} from '../../utils/fire-custom-event';
import isEmpty from 'lodash-es/isEmpty';
import {updateCurrentUser} from '../../user/user-actions';
import {pageHeaderStyles} from './page-header-styles';
import {translate, use} from 'lit-translate';
import {setLanguage} from '../../../redux/actions/active-language';
import {activeLanguage} from '../../../redux/reducers/active-language';
import {countriesDropdownStyles} from './countries-dropdown-styles';
import {AnyObject, EtoolsUser, GenericObject} from '@unicef-polymer/etools-types';

store.addReducers({
  activeLanguage
});
/**
 * page header element
 * @LitElement
 * @customElement
 */
@customElement('page-header')
export class PageHeader extends connect(store)(LitElement) {
  static get styles() {
    return [pageHeaderStyles];
  }

  public render() {
    // main template
    // language=HTML
    return html`
      ${countriesDropdownStyles}
      <style>
        app-toolbar {
          background-color: ${this.headerColor};
        }
        support-btn {
          color: var(--header-icon-color);
        }
        .dropdowns {
          display: flex;
          margin-right: 5px;
        }
        .header {
          flex-wrap: wrap;
          height: 100%;
          justify-content: space-between;
        }
        .nav-menu-button {
          min-width: 70px;
        }
        .header__item {
          display: flex;
          align-items: center;
        }
        .header__right-group {
          justify-content: space-evenly;
        }
        .logo {
          margin-left: 20px;
        }
        @media (max-width: 380px) {
          .header__item {
            flex-grow: 1;
          }
        }
        @media (max-width: 576px) {
          #app-logo {
            display: none;
          }
          .envWarning {
            font-size: 10px;
            margin-left: 2px;
          }
        }
      </style>

      <app-toolbar sticky class="content-align header">
        <div class="header__item">
          <paper-icon-button
            id="menuButton"
            icon="menu"
            class="nav-menu-button"
            @tap="${() => this.menuBtnClicked()}"
          ></paper-icon-button>
          <img id="app-logo" class="logo" src="images/etools-logo-color-white.svg" alt="eTools" />
          ${this.isStaging
            ? html`<div class="envWarning">
           <span class='envLong'> - </span>${this.environment} <span class='envLong'>  TESTING ENVIRONMENT</div>`
            : ''}
        </div>
        <div class="header__item header__right-group">
          <div class="dropdowns">
            <etools-dropdown
              .selected="${this.selectedLanguage}"
              .options="${this.languages}"
              option-label="display_name"
              option-value="value"
              @etools-selected-item-changed="${({detail}: CustomEvent) => this.languageChanged(detail.selectedItem)}"
              trigger-value-change-event
              hide-search
              allow-outside-scroll
              no-label-float
              .autoWidth="${true}"
            ></etools-dropdown>

            <countries-dropdown dir="${this.dir}"></countries-dropdown>
          </div>

          <etools-profile-dropdown
            title=${translate('GENERAL.PROFILEANDSIGNOUT')}
            .sections="${this.profileDrSections}"
            .offices="${this.profileDrOffices}"
            .users="${this.profileDrUsers}"
            .profile="${this.profile ? {...this.profile} : {}}"
            @save-profile="${this.handleSaveProfile}"
            @sign-out="${this._signOut}"
          >
          </etools-profile-dropdown>
        </div>
      </app-toolbar>
    `;
  }

  @property({type: Boolean})
  public isStaging = false;

  @property({type: String})
  rootPath: string = ROOT_PATH;

  @property({type: String})
  public headerColor = 'var(--header-bg-color)';

  @property({type: Object})
  profile!: EtoolsUser | null;

  @property({type: Object})
  profileDropdownData: any | null = null;

  @property({type: Array})
  offices: any[] = [];

  @property({type: Array})
  sections: any[] = [];

  @property({type: Array})
  users: any[] = [];

  @property({type: Array})
  profileDrOffices: any[] = [];

  @property({type: Array})
  profileDrSections: any[] = [];

  @property({type: Array})
  profileDrUsers: any[] = [];

  @property({type: Array})
  editableFields: string[] = ['office', 'section', 'job_title', 'phone_number', 'oic', 'supervisor'];

  @property({type: String})
  environment = 'LOCAL';

  @property({type: String})
  dir = '';

  languages: GenericObject<string>[] = [
    {value: 'en', display_name: 'English'},
    {value: 'ar', display_name: 'Arabic'}
  ];

  @property() selectedLanguage!: string;

  public connectedCallback() {
    super.connectedCallback();
    this.setBgColor();
    this.checkEnvironment();
  }

  public stateChanged(state: RootState) {
    if (state) {
      this.profile = state.user!.data;
      if (state.activeLanguage && state.activeLanguage.activeLanguage !== this.selectedLanguage) {
        this.selectedLanguage = state.activeLanguage!.activeLanguage;
        setTimeout(() => {
          const htmlTag = document.querySelector('html');
          if (this.selectedLanguage === 'ar') {
            htmlTag!.setAttribute('dir', 'rtl');
            this.setAttribute('dir', 'rtl');
            this.dir = 'rtl';
          } else if (htmlTag!.getAttribute('dir')) {
            htmlTag!.removeAttribute('dir');
            this.removeAttribute('dir');
            this.dir = '';
          }
        });
      }
    }
  }

  public handleSaveProfile(e: any) {
    const modifiedFields = this._getModifiedFields(this.profile, e.detail.profile);
    if (isEmpty(modifiedFields)) {
      // empty profile means no changes found
      this.showSaveNotification();
      return;
    }
    this.profileSaveLoadingMsgDisplay();
    updateCurrentUser(modifiedFields)
      .then(() => {
        this.showSaveNotification();
      })
      .catch(() => {
        this.showSaveNotification('Profile data not saved. Save profile error!');
      })
      .then(() => {
        this.profileSaveLoadingMsgDisplay(false);
      });
  }

  protected profileSaveLoadingMsgDisplay(show = true) {
    fireEvent(this, 'global-loading', {
      active: show,
      loadingSource: 'profile-save'
    });
  }

  protected showSaveNotification(msg?: string) {
    fireEvent(this, 'toast', {
      text: msg ? msg : 'All changes are saved.',
      showCloseBtn: false
    });
  }

  protected _getModifiedFields(originalData: any, newData: any) {
    const modifiedFields: AnyObject = {};
    this.editableFields.forEach(function (field: any) {
      if (originalData[field] !== newData[field]) {
        modifiedFields[field] = newData[field];
      }
    });

    return modifiedFields;
  }

  languageChanged(selectedItem: any): void {
    if (!selectedItem || !selectedItem.value) {
      return;
    }
    const newLanguage = selectedItem.value;
    if (this.selectedLanguage !== newLanguage) {
      localStorage.setItem('defaultLanguage', newLanguage);
      use(newLanguage)
        .then(() => store.dispatch(setLanguage(newLanguage)))
        .finally(() => location.reload());
    }
  }

  public menuBtnClicked() {
    store.dispatch(updateDrawerState(true));
    // fireEvent(this, 'drawer');
  }

  private setBgColor() {
    // If not production environment, changing header color to red
    if (!isProductionServer()) {
      this.headerColor = 'var(--nonprod-header-color)';
    }
  }

  protected _signOut() {
    // this._clearDexieDbs();
    this.clearLocalStorage();
    window.location.href = window.location.origin + '/logout';
  }

  // TODO
  // protected _clearDexieDbs() {
  //   window.EtoolsPmpApp.DexieDb.delete();
  // }

  protected clearLocalStorage() {
    localStorage.clear();
  }

  protected checkEnvironment() {
    this.showLanguagesForDevDomains();
    this.isStaging = !isProductionServer();
    this.environment = isProductionServer() ? 'DEMO' : 'LOCAL';
  }

  protected showLanguagesForDevDomains() {
    const location = window.location.host;
    const devDomains = ['localhost', 'etools-dev', 'etools-test'];
    if (devDomains.some((x) => location.indexOf(x) > -1)) {
      this.languages.splice(1, 0, {value: 'ro', display_name: 'Romanian'});
    }
  }
}
