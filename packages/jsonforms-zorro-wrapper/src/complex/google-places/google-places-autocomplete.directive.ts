/// <reference types="google.maps" />
import { Directive, input, signal } from '@angular/core';
import { AutocompleteSuggestion } from './google-places';

@Directive({
  selector: '[googlePlacesAutocomplete]',
  standalone: true,
  exportAs: 'autocomplete',
})
export class GooglePlacesAutocompleteDirective {
  includedPrimaryTypes = input<string[]>([]);
  countryIsoCode = input<string[]>([]);

  readonly suggestions = signal<AutocompleteSuggestion[]>([]);

  async refetchAutocompleteSuggestions(value: string | AutocompleteSuggestion | null) {
    if (!value || typeof value !== 'string') {
      this.suggestions.set([]);
      return;
    }

    const data = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
      input: value,
      includedPrimaryTypes: this.includedPrimaryTypes(),
      includedRegionCodes: this.countryIsoCode(),
    });

    this.suggestions.set(
      data.suggestions.map(suggestion => ({
        placeId: suggestion.placePrediction.placeId,
        mainText: suggestion.placePrediction.mainText.text,
        secondaryText: suggestion.placePrediction.secondaryText?.text,
      })),
    );
  }
}
