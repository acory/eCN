import {AnyObject} from '@unicef-polymer/etools-types/dist/global.types';
import {translate} from 'lit-translate';
import {EtoolsFilter, EtoolsFilterTypes} from '@unicef-polymer/etools-filters/src/etools-filters';
import {setselectedValueTypeByFilterKey} from '@unicef-polymer/etools-filters/src/filters';

export enum InterventionFilterKeys {
  search = 'search',
  status = 'status',
  document_type = 'document_type',
  partners = 'partners',
  start = 'start',
  end = 'end',
  end_after = 'end_after',
  contingency_pd = 'contingency_pd',
  budget_owner = 'budget_owner__in',
  editable_by = 'editable_by'
}

export type FilterKeysAndTheirSelectedValues = {[key in InterventionFilterKeys]?: any};

export const defaultSelectedFilters: FilterKeysAndTheirSelectedValues = {
  search: '',
  status: [],
  document_type: [],
  partners: [],
  start: null,
  end: null,
  end_after: null,
  contingency_pd: false,
  budget_owner__in: []
};

export const selectedValueTypeByFilterKey: AnyObject = {
  [InterventionFilterKeys.search]: 'string',
  [InterventionFilterKeys.status]: 'Array',
  [InterventionFilterKeys.document_type]: 'Array',
  [InterventionFilterKeys.partners]: 'Array',
  [InterventionFilterKeys.start]: 'string',
  [InterventionFilterKeys.end]: 'string',
  [InterventionFilterKeys.end_after]: 'string',
  [InterventionFilterKeys.contingency_pd]: 'boolean',
  [InterventionFilterKeys.editable_by]: 'string',
  [InterventionFilterKeys.budget_owner]: 'Array'
};

setselectedValueTypeByFilterKey(selectedValueTypeByFilterKey);

export const defaultFilters: EtoolsFilter[] = [
  {
    filterName: translate('INTERVENTIONS_LIST.SEARCH_RECORDS'),
    filterKey: InterventionFilterKeys.search,
    type: EtoolsFilterTypes.Search,
    selectedValue: '',
    selected: true
  },
  {
    filterName: translate('INTERVENTIONS_LIST.STATUS'),
    filterKey: InterventionFilterKeys.status,
    type: EtoolsFilterTypes.DropdownMulti,
    selectionOptions: [],
    optionValue: 'value',
    optionLabel: 'label',
    selectedValue: [],
    selected: true,
    minWidth: '350px',
    hideSearch: true,
    disabled: false
  },
  {
    filterName: translate('INTERVENTIONS_LIST.PD_TYPE'),
    filterKey: InterventionFilterKeys.document_type,
    type: EtoolsFilterTypes.DropdownMulti,
    selectionOptions: [],
    optionValue: 'value',
    optionLabel: 'label',
    selectedValue: [],
    selected: false,
    minWidth: '350px',
    hideSearch: true,
    disabled: false
  },
  {
    filterName: translate('INTERVENTIONS_LIST.PARTNER_ORG'),
    filterKey: InterventionFilterKeys.partners,
    type: EtoolsFilterTypes.DropdownMulti,
    selectionOptions: [],
    selectedValue: [],
    selected: false,
    minWidth: '350px',
    hideSearch: false,
    disabled: false,
    optionValue: 'id',
    optionLabel: 'name'
  },
  {
    filterName: translate('INTERVENTIONS_LIST.BUDGET_OWNER'),
    filterKey: InterventionFilterKeys.budget_owner,
    type: EtoolsFilterTypes.DropdownMulti,
    selectionOptions: [],
    selectedValue: [],
    selected: false,
    minWidth: '350px',
    hideSearch: false,
    disabled: false,
    optionValue: 'id',
    optionLabel: 'name'
  },
  {
    filterName: translate('INTERVENTIONS_LIST.CONTINGENCY_PD'),
    type: EtoolsFilterTypes.Toggle,
    filterKey: InterventionFilterKeys.contingency_pd,
    selectedValue: false,
    selected: true
  },
  {
    filterName: translate('EDITABLE_BY'),
    type: EtoolsFilterTypes.Dropdown,
    filterKey: InterventionFilterKeys.editable_by,
    selectedValue: '',
    selected: true
  },
  {
    filterName: translate('INTERVENTIONS_LIST.ENDS_BEFORE'),
    type: EtoolsFilterTypes.Date,
    filterKey: InterventionFilterKeys.end,
    selectedValue: '',
    selected: false
  },
  {
    filterName: translate('INTERVENTIONS_LIST.STARTS_AFTER'),
    filterKey: InterventionFilterKeys.start,
    type: EtoolsFilterTypes.Date,
    selectedValue: null,
    selected: false
  },
  {
    filterName: translate('INTERVENTIONS_LIST.ENDS_AFTER'),
    type: EtoolsFilterTypes.Date,
    filterKey: InterventionFilterKeys.end_after,
    selectedValue: '',
    selected: false
  }
];
