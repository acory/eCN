import {sendRequest, EtoolsRequestEndpoint} from '@unicef-polymer/etools-ajax/etools-ajax-request';
import {connect} from 'pwa-helpers/connect-mixin';
import {logError} from '@unicef-polymer/etools-behaviors/etools-logging.js';
import {store} from '../../redux/store';
import {LitElement, property} from 'lit-element';
import {etoolsEndpoints} from '../../endpoints/endpoints-list';
import {updateEnvFlags} from '../../redux/actions/common-data';
import {EnvFlags} from '@unicef-polymer/etools-types';

/**
 * @customElement
 */
class EnvironmentFlags extends connect(store)(LitElement) {
  @property({type: Object})
  envFlagsDefaultValue: EnvFlags = {
    prp_mode_off: true,
    prp_server_on: false
  };

  protected _processAndSetEnvFlags(envFlags: EnvFlags) {
    const activeflags = envFlags.active_flags;

    const flagObject: any = {
      prp_mode_off: false
    };

    if (activeflags) {
      activeflags.forEach((flag) => {
        flagObject[flag] = true;
      });
    }

    return flagObject;
  }

  private _loadEnvFlagsData() {
    sendRequest({
      endpoint: etoolsEndpoints.environmentFlags as EtoolsRequestEndpoint
    })
      .then((response: any) => {
        if (response) {
          store.dispatch(updateEnvFlags(this._processAndSetEnvFlags(response)));
        } else {
          store.dispatch(updateEnvFlags(this.envFlagsDefaultValue));
        }
      })
      .catch((error: any) => {
        logError('Env flags request failed', null, error);
        store.dispatch(updateEnvFlags(this.envFlagsDefaultValue));
      });
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadEnvFlagsData();
  }
}

window.customElements.define('environment-flags', EnvironmentFlags);
