import { Directive, Input } from '@angular/core';
import { JsonSchema, OwnPropsOfRenderer } from '@jsonforms/core';
import { JFZElement } from '../other/uischema';

@Directive()
export class JsonFormsBaseRenderer<T extends JFZElement> {
  @Input() uischema: T;
  @Input() schema: JsonSchema;
  @Input() path: string;

  get additionalClasses(): string {
    return this.uischema['additionalClasses']?.join(' ') || '';
  }

  protected getOwnProps(): OwnPropsOfRenderer {
    return {
      uischema: this.uischema,
      schema: this.schema,
      path: this.path,
    };
  }
}
