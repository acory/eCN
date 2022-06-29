import {EtoolsEndpoint} from '@unicef-polymer/etools-types';

export interface EtoolsEndpoints {
  userProfile: EtoolsEndpoint;
  changeCountry: EtoolsEndpoint;
  interventions: EtoolsEndpoint;
  intervention: EtoolsEndpoint;
  locations: EtoolsEndpoint;
  sites: EtoolsEndpoint;
  static: EtoolsEndpoint;
  partners: EtoolsEndpoint;
  sections: EtoolsEndpoint;
  disaggregations: EtoolsEndpoint;
  offices: EtoolsEndpoint;
  unicefUsers: EtoolsEndpoint;
  dropdownsData: EtoolsEndpoint;
  agreements: EtoolsEndpoint;
  environmentFlags: EtoolsEndpoint;
  countryProgrammes: EtoolsEndpoint;
}

export const etoolsEndpoints: EtoolsEndpoints = {
  userProfile: {
    url: '/api/v3/users/profile/'
  },
  changeCountry: {
    url: '/api/v3/users/changecountry/'
  },
  countryProgrammes: {
    url: '/api/v2/reports/countryprogramme/'
  },
  interventions: {
    url: '/api/pmp/v3/interventions/?show_amendments=true'
  },
  intervention: {
    template: '/api/pmp/v3/interventions/<%=interventionId%>/'
  },
  locations: {
    url: '/api/locations-light/'
  },
  sites: {
    url: '/api/v1/field-monitoring/settings/sites/?page_size=all'
  },
  static: {
    url: '/api/v2/dropdowns/static/'
  },
  partners: {
    url: '/api/pmp/v3/partners/'
  },
  sections: {
    url: '/api/sections/v3/'
  },
  offices: {
    url: '/api/offices/v3/'
  },
  disaggregations: {
    url: '/api/v2/reports/disaggregations/'
  },
  unicefUsers: {
    url: '/api/v3/users/?verbosity=minimal'
  },
  dropdownsData: {
    url: '/api/pmp/v3/dropdowns/dynamic/'
  },
  agreements: {
    url: '/api/pmp/v3/agreements/'
  },
  environmentFlags: {
    url: '/api/v2/environment/flags/'
  }
};
