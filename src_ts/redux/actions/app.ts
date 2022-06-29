/* eslint-disable max-len */
import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';
import {ROOT_PATH} from '../../config/config';
import {DEFAULT_ROUTE, EtoolsRouter, ROUTE_404, updateAppLocation} from '../../routing/routes';
import {getRedirectToListPath} from '../../routing/subpage-redirect';
import {RouteDetails} from '@unicef-polymer/etools-types';

import {
  RESET_CURRENT_ITEM,
  UPDATE_ROUTE
} from '../../components/pages/interventions/intervention-tab-pages/common/actions/actionsContants';

export const UPDATE_ROUTE_DETAILS = 'UPDATE_ROUTE_DETAILS';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const UPDATE_SMALLMENU_STATE = 'UPDATE_SMALLMENU_STATE';

export interface AppActionUpdateRouteDetails extends Action<'UPDATE_ROUTE_DETAILS'> {
  routeDetails: any;
}
export interface AppActionUpdateDrawerState extends Action<'UPDATE_DRAWER_STATE'> {
  opened: boolean;
}

export type AppAction = AppActionUpdateRouteDetails | AppActionUpdateDrawerState | any;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

const updateStoreRouteDetails: ActionCreator<AppActionUpdateRouteDetails> = (routeDetails: any) => {
  return {
    type: UPDATE_ROUTE_DETAILS,
    routeDetails
  };
};

const updateRouteDetails = (routeDetails: any) => {
  return {
    type: UPDATE_ROUTE,
    routeDetails
  };
};

const resetCurrentItem = () => {
  return {
    type: RESET_CURRENT_ITEM
  };
};

const loadPageComponents: ActionCreator<ThunkResult> = (routeDetails: RouteDetails) => (dispatch, getState) => {
  if (!routeDetails) {
    // invalid route => redirect to 404 page
    updateAppLocation(ROUTE_404);
    return;
  }

  if (routeDetails.routeName === 'not-found') {
    import('../../components/pages/not-found.js');
  } else {
    switch (routeDetails.subRouteName) {
      case 'list':
        import('../../components/pages/interventions/intervention-list.js');
        break;
      case 'metadata':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-metadata/intervention-metadata.js'
        );
        break;
      case 'workplan':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-workplan/intervention-workplan.js'
        );
        break;
      case 'workplan-editor':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-workplan-editor/intervention-workplan-editor.js'
        );
        break;
      case 'timing':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-timing/intervention-timing.js'
        );
        break;
      case 'strategy':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-strategy/intervention-strategy.js'
        );
        break;
      case 'attachments':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-attachments/intervention-attachments.js'
        );
        break;
      case 'review':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-review/intervention-review.js'
        );
        break;
      case 'progress':
        import('../../components/pages/interventions/intervention-tab-pages/intervention-tabs.js');
        import(
          '../../components/pages/interventions/intervention-tab-pages/intervention-progress/intervention-progress.js'
        );
        break;

      default:
        console.log('No file imports configuration found (componentsLazyLoadConfig)!');
        updateAppLocation(ROUTE_404);
        break;
    }
  }

  // add page details to redux store, to be used in other components
  const prevRouteDetails = getState().app?.routeDetails;
  if (commingFromPDDetailsToList(prevRouteDetails!, routeDetails)) {
    // Avoid multiple list requests after updating PD data that is displayed on the list and then going to the list
    dispatch(updateRouteDetails(routeDetails));
    dispatch(resetCurrentItem());
  } else {
    dispatch(updateStoreRouteDetails(routeDetails));
  }
};

export const updateDrawerState: ActionCreator<AppActionUpdateDrawerState> = (opened: boolean) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened
  };
};

export const updateSmallMenu: any = (smallMenu: boolean) => {
  return {
    type: UPDATE_SMALLMENU_STATE,
    smallMenu
  };
};

export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
  // Check if path matches a valid app route, use route details to load required page components

  // if app route is accessed, redirect to default route (if not already on it)
  // @ts-ignore
  if (path === ROOT_PATH && ROOT_PATH !== DEFAULT_ROUTE) {
    updateAppLocation(DEFAULT_ROUTE);
    return;
  }

  // some routes need redirect to subRoute list
  const redirectPath: string | undefined = getRedirectToListPath(path);
  if (redirectPath) {
    updateAppLocation(redirectPath);
    return;
  }

  const routeDetails: RouteDetails | null = EtoolsRouter.getRouteDetails(path);

  dispatch(loadPageComponents(routeDetails));
};

function commingFromPDDetailsToList(prevRouteDetails: RouteDetails, routeDetails: RouteDetails | null) {
  return (
    routeDetails &&
    prevRouteDetails &&
    prevRouteDetails.routeName === 'interventions' &&
    prevRouteDetails.subRouteName !== 'list' &&
    routeDetails?.subRouteName === 'list'
  );
}
