import {Router} from './router';
import {ROOT_PATH} from '../config/config';
import {RouteCallbackParams, RouteDetails} from '@unicef-polymer/etools-types';

export const EtoolsRouter = new Router(ROOT_PATH);
const routeParamRegex = '([^\\/?#=+]+)';

EtoolsRouter.addRoute(new RegExp('^interventions/list$'), (params: RouteCallbackParams): RouteDetails => {
  return {
    routeName: 'interventions',
    subRouteName: 'list',
    path: params.matchDetails[0],
    queryParams: params.queryParams,
    params: null
  };
})
  .addRoute(
    new RegExp(`^interventions\\/${routeParamRegex}\\/${routeParamRegex}$`),
    (params: RouteCallbackParams): RouteDetails => {
      return {
        routeName: 'interventions',
        subRouteName: params.matchDetails[2], // tab name
        path: params.matchDetails[0],
        queryParams: params.queryParams,
        params: {
          interventionId: params.matchDetails[1]
        }
      };
    }
  )
  .addRoute(
    new RegExp(`^interventions\\/${routeParamRegex}\\/${routeParamRegex}\\/${routeParamRegex}$`),
    (params: RouteCallbackParams): RouteDetails => {
      return {
        routeName: 'interventions',
        subRouteName: params.matchDetails[2], // tab name
        subSubRouteName: params.matchDetails[3], // sub tab name
        path: params.matchDetails[0],
        queryParams: params.queryParams,
        params: {
          interventionId: params.matchDetails[1]
        }
      };
    }
  )
  .addRoute(new RegExp(`^not-found$`), (params: RouteCallbackParams): RouteDetails => {
    return {
      routeName: 'not-found',
      subRouteName: null,
      path: params.matchDetails[0],
      queryParams: null,
      params: null
    };
  });

/**
 * Utility used to update location based on routes and dispatch navigate action (optional)
 */
export const updateAppLocation = (newLocation: string): void => {
  const _newLocation = EtoolsRouter.prepareLocationPath(newLocation);

  EtoolsRouter.pushState(_newLocation);

  window.dispatchEvent(new CustomEvent('popstate'));
};

export const replaceAppLocation = (newLocation: string): void => {
  const _newLocation = EtoolsRouter.prepareLocationPath(newLocation);

  EtoolsRouter.replaceState(_newLocation);

  /**
   * Note that just calling history.pushState() or history.replaceState()
   * won't trigger a popstate event.
   * The popstate event is only triggered by doing a browser action
   * such as a click on the back button (or calling history.back() in JavaScript).
   */
  window.dispatchEvent(new CustomEvent('popstate'));
};

export const ROUTE_404 = '/not-found';
export const DEFAULT_ROUTE = '/interventions/list';
