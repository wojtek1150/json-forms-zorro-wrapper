export const AUTOCOMPLETE_CITY_PRIMARY_TYPE = 'locality';

export interface AutocompleteSuggestion {
  placeId: string;
  mainText: string;
  secondaryText?: string;
}
