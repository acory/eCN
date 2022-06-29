import {updateUserData} from '../../redux/actions/user';
import {getEndpoint} from '../../endpoints/endpoints';
import {store} from '../../redux/store';
import {etoolsEndpoints} from '../../endpoints/endpoints-list';
import {sendRequest} from '@unicef-polymer/etools-ajax/etools-ajax-request';
import {AnyObject, EtoolsUser} from '@unicef-polymer/etools-types';

export function getCurrentUser() {
  return sendRequest({
    endpoint: {url: getEndpoint(etoolsEndpoints.userProfile).url}
  })
    .then((response: EtoolsUser) => {
        store.dispatch(updateUserData(response));
      return response;
    })
    .catch((error: AnyObject) => {
      if ([403, 401].includes(error.status)) {
        window.location.href = window.location.origin + '/login';
      }
      throw error;
    });
}

function redirectToPMPIfNeccessary(user: EtoolsUser) {
  if (!user.is_superuser) {
    if (user.is_unicef_user) {
      window.location.href = window.location.href.replace('epd', 'pmp');
      return true;
    }
  }
  return false;
}

export function updateCurrentUser(profile: AnyObject) {
  return sendRequest({
    method: 'PATCH',
    endpoint: {url: getEndpoint(etoolsEndpoints.userProfile).url},
    body: profile
  })
    .then((response: AnyObject) => {
      store.dispatch(updateUserData(response));
    })
    .catch((error: AnyObject) => {
      console.error('[EtoolsUser]: updateUserData req error ', error);
      throw error;
    });
}

export function changeCurrentUserCountry(countryId: number) {
  return sendRequest({
    method: 'POST',
    endpoint: {url: getEndpoint(etoolsEndpoints.changeCountry).url},
    body: {country: countryId}
  }).catch((error: AnyObject) => {
    console.error('[EtoolsUser]: changeCountry req error ', error);
    throw error;
  });
}
