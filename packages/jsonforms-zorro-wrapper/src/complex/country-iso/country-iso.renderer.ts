import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, hasType, optionIs, RankedTester, rankWith, schemaMatches, StatePropsOfControl, uiTypeIs, or } from '../../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzValidationStatusPipe } from '../../other/validation-status.pipe';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';

interface Country {
  country: string;
  iso: string;
}

@Component({
  selector: 'CountryIsoControlRenderer',
  templateUrl: './country-iso.renderer.html',
  styleUrls: ['./country-iso.renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    NzValidationStatusPipe,
    NzSelectComponent,
    ReactiveFormsModule,
    NzOptionComponent,
  ],
})
export class CountryIsoControlRenderer extends JsonFormsControl {
  options: {
    label: string;
    value: any;
    iso?: string;
  }[];
  private selectedValue: string;
  private countriesList: Country[];
  private isoKey: string;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event || undefined;

  override onChange(event: string) {
    if (this.selectedValue !== event) {
      this.selectedValue = event;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
      
      if (this.countriesList && event) {
        const selectedCountry = this.countriesList.find(country => country.country === event);
        if (selectedCountry) {
          this.jsonFormsService.updateCore(Actions.update(this.propsPath + this.isoKey, () => selectedCountry.iso));
        }
      }
      
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    super.mapAdditionalProps(props);
    this.isoKey = this.uischema.options?.isoKey || 'Iso';
    
    if (this.uischema.options?.countriesList) {
      this.countriesList = this.uischema.options.countriesList;
      this.options = this.countriesList.map(country => ({
        label: country.country,
        value: country.country,
        iso: country.iso
      }));

      // Generate oneOf schema for proper  validation
      const oneOfSchema = this.countriesList.map(country => ({
        const: country.country,
        title: country.country
      }));
      
      // Update the schema to include oneOf validation
      this.scopedSchema = {
        ...this.scopedSchema,
        type: 'string',
        oneOf: oneOfSchema
      };
    } else if (this.scopedSchema.enum) { // Fallback when no countriesList is provided
      this.options = this.scopedSchema.enum.map(option => ({ label: option, value: option }));
    } else { // Oneof support
      this.options = this.scopedSchema.oneOf.map(option => ({ label: option.title, value: option.const }));
    }
  }
}

export const CountryIsoControlRendererTester: RankedTester = rankWith(
  20,
  and(
    uiTypeIs('Control'),
    and(
      optionIs('format', 'country-iso'),
      or(
        schemaMatches(schema => hasType(schema, 'array') && !Array.isArray(schema.items) && schema.uniqueItems === true),
        schemaMatches(schema => hasType(schema, 'string'))
      ),
    ),
  ),
);
