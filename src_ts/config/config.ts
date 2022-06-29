export const SMALL_MENU_ACTIVE_LOCALSTORAGE_KEY = 'etoolsAppSmallMenuIsActive';

declare global {
  interface Window {
    EtoolsEsmmFitIntoEl: any;
    applyFocusVisiblePolyfill: any;
  }
}

export const ROOT_PATH = '';

const PROD_DOMAIN = 'etools.unicef.org';

function getBasePath() {
  return '';
}

export const getDomainByEnv = () => {
  return '';
};

export const isProductionServer = () => {
  const location = window.location.host;
  return location.indexOf('demo.unicef.io') > -1 || location.indexOf(PROD_DOMAIN) > -1;
};
