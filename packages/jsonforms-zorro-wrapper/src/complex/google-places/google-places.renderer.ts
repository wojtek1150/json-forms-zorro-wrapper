/// <reference types="google.maps" />
import { AfterViewInit, ChangeDetectorRef, Component, signal } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, optionIs, RankedTester, rankWith, schemaTypeIs, toDataPathSegments, uiTypeIs } from '../../core';
import { GooglePlacesApiLoaderService } from './google-places-api-loader.service';
import { debounceTime, takeUntil } from 'rxjs';
import { get } from 'lodash-es';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../../other/validation-status.pipe';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzAutocompleteComponent, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective } from 'ng-zorro-antd/auto-complete';
import { AUTOCOMPLETE_CITY_PRIMARY_TYPE } from './google-places';
import { GooglePlacesAutocompleteDirective } from './google-places-autocomplete.directive';

@Component({
  selector: 'GooglePlacesRenderer',
  templateUrl: './google-places.renderer.html',
  styleUrls: ['./google-places.renderer.scss'],
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    ReactiveFormsModule,
    NzValidationStatusPipe,
    NzInputDirective,
    NzAutocompleteComponent,
    NzAutocompleteOptionComponent,
    GooglePlacesAutocompleteDirective,
    NzAutocompleteTriggerDirective,
  ],
})
export class GooglePlacesRenderer extends JsonFormsControl implements AfterViewInit {
  private countryRestrictionField: string;

  readonly countryIsoCodes = signal<string[]>([]);

  readonly AUTOCOMPLETE_CITY_PRIMARY_TYPE = AUTOCOMPLETE_CITY_PRIMARY_TYPE;

  constructor(
    jsonformsService: JsonFormsAngularService,
    changeDetectorRef: ChangeDetectorRef,
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

        if (this.countryRestrictionField) {
          this.jsonFormsService.$formValue.pipe(takeUntil(this.destroy$), debounceTime(1_000)).subscribe(formData => {
            const value = get(formData, this.countryRestrictionField);
            this.countryIsoCodes.set(!value ? [] : typeof value === 'string' ? [value] : value);
          });
        }
      }
    });
  }

  onPlaceSelected(option: NzAutocompleteOptionComponent) {
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => option.nzLabel));
    this.jsonFormsService.updateCore(Actions.update(this.propsPath + 'PlaceId', () => option.nzValue));
  }

  private googleLibNotFound(): boolean {
    return !google || !google.maps || !google.maps.places;
  }
}

export const GooglePlacesControlRendererTester: RankedTester = rankWith(
  4,
  and(uiTypeIs('Control'), schemaTypeIs('string'), optionIs('format', 'google-places')),
);
