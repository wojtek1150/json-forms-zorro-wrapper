import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, hasOption, hasType, optionIs, RankedTester, rankWith, schemaMatches, uiTypeIs } from '../../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzValidationStatusPipe } from '../../other/validation-status.pipe';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from '../../components/avatar.component';

interface Person {
  name: string;
  email?: string;
  avatar?: string;
}

@Component({
  selector: 'MentionControlRenderer',
  templateUrl: './mention.renderer.html',
  styleUrls: ['./mention.renderer.scss'],
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
    AvatarComponent,
  ],
})
export class MentionControlRenderer extends JsonFormsControl {
  readonly INFINITY = Infinity;

  selectOptions: { user: Person; value: string | Person; checked?: boolean }[] = [];
  returnValueKey: string = 'email';

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event;

  override onChange(event: string[] | Person[]): void {
    this.selectOptions = this.selectOptions.map(option => {
      return {
        user: option.user,
        value: option.value,
        checked:
          this.returnValueKey === 'all'
            ? event.some(person => person.email === (option.value as Person).email)
            : (event as string[]).includes(option.value as string),
      };
    });
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
    this.triggerValidation();
  }

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.returnValueKey = this.uischema.options?.returnValueKey || 'email';
      this.selectOptions = this.getOptions();
    }
  }

  private getOptions(): { user: Person; value: string }[] {
    const mentionKey = this.uischema.options?.mentionKey;
    if (mentionKey) {
      return this.config.mentionDictionary[mentionKey].map(user => {
        return {
          user,
          value: this.returnValueKey === 'all' ? user : user[this.returnValueKey],
        };
      });
    }
    return [];
  }
}

export const MentionControlRendererTester: RankedTester = rankWith(
  20,
  and(
    uiTypeIs('Control'),
    and(
      optionIs('format', 'mention'),
      hasOption('mentionKey'),
      schemaMatches(schema => hasType(schema, 'array')),
    ),
  ),
);
