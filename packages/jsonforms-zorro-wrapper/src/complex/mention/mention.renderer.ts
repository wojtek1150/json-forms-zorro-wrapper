import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, hasOption, hasType, optionIs, RankedTester, rankWith, schemaMatches, uiTypeIs } from '../../core';

interface Person {
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'MentionControlRenderer',
  templateUrl: './mention.renderer.html',
  styleUrls: ['./mention.renderer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionControlRenderer extends JsonFormsControl {
  options: { user: Person; value: string; checked?: boolean }[] = [];

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event;

  override onChange(event: string[]) {
    this.options = this.options.map(option => {
      return {
        user: option.user,
        value: option.value,
        checked: event.includes(option.value),
      };
    });
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
    this.triggerValidation();
  }

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.options = this.getOptions();
    }
  }

  private getOptions(): { user: Person; value: string }[] {
    const mentionKey = this.uischema.options?.mentionKey;
    if (mentionKey) {
      return this.config.mentionDictionary[mentionKey].map(user => ({ user, value: user.email }));
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
