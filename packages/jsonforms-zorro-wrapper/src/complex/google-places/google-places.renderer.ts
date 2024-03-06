/// <reference types="google.maps" />

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, optionIs, RankedTester, rankWith, schemaTypeIs, toDataPathSegments, uiTypeIs } from '../../core';
import { GooglePlaceFormatterHelper } from './google-places.helper';
import { GooglePlacesApiLoaderService } from './google-places-api-loader.service';
import { takeUntil } from 'rxjs';
import { get } from 'lodash-es';

@Component({
  selector: 'GooglePlacesRenderer',
  templateUrl: './google-places.renderer.html',
  styleUrls: ['./google-places.renderer.scss'],
})
export class GooglePlacesRenderer extends JsonFormsControl implements AfterViewInit {
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  private autocomplete: google.maps.places.Autocomplete;
  private mapsEventListener: google.maps.MapsEventListener;
  private place: google.maps.places.PlaceResult;
  private countryRestrictionField: string;

  constructor(
    jsonformsService: JsonFormsAngularService,
    changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private gpaLoader: GooglePlacesApiLoaderService,
  ) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => {
    return event.target.value || undefined;
  };

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.countryRestrictionField = this.uischema.options?.countryRestrictionField
        ? toDataPathSegments(this.uischema.options?.countryRestrictionField).join('.')
        : null;
    }
  }

  override onChange(event: string) {
    // Reset both fields if cleared
    if (!this.getEventValue(event)) {
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => undefined));
      this.jsonFormsService.updateCore(Actions.update(this.propsPath + 'PlaceId', () => undefined));
    }
    return; // do nothing when not valid selection
  }

  ngAfterViewInit(): void {
    this.gpaLoader.mapsLoaded.pipe(takeUntil(this.destroy$)).subscribe(loaded => {
      if (loaded) {
        if (this.googleLibNotFound()) {
          throw new Error('Google maps library cannot be found');
        }
        if (this.mapsEventListener) {
          this.mapsEventListener.remove();
        }

        this.autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement, {
          types: ['(cities)'],
        });

        if (this.countryRestrictionField) {
          this.jsonFormsService.$formValue.pipe(takeUntil(this.destroy$)).subscribe(formData => {
            const value = get(formData, this.countryRestrictionField);
            this.autocomplete.setComponentRestrictions({
              country: typeof value === 'string' ? [value] : value,
            });
            this.onPlaceSelected({ placeId: null, formattedCityName: null });
          });
        }

        this.mapsEventListener = google.maps.event.addListener(this.autocomplete, 'place_changed', () => this.handleChangeEvent());

        this.inputElement.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.key && event.key.toLowerCase() === 'enter' && event.target === this.inputElement.nativeElement) {
            event.preventDefault();
            event.stopPropagation();
          }
        });
      }
    });
  }

  private googleLibNotFound(): boolean {
    return !google || !google.maps || !google.maps.places;
  }

  private handleChangeEvent(): void {
    this.ngZone.run(() => {
      this.place = this.autocomplete.getPlace();

      if (this.place && this.place.place_id) {
        this.onPlaceSelected(GooglePlaceFormatterHelper.getFormattedPlace(this.place));
      } else {
        this.onPlaceSelected({ placeId: null, formattedCityName: null });
      }
    });
  }

  private onPlaceSelected(place: { placeId: string; formattedCityName: string }) {
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => place.formattedCityName));
    this.jsonFormsService.updateCore(Actions.update(this.propsPath + 'PlaceId', () => place.placeId));
  }
}

export const GooglePlacesControlRendererTester: RankedTester = rankWith(
  4,
  and(uiTypeIs('Control'), schemaTypeIs('string'), optionIs('format', 'google-places')),
);
