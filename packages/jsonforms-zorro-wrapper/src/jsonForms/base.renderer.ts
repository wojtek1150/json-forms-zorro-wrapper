import { Directive, Input } from '@angular/core';
import { JsonSchema, OwnPropsOfRenderer, UISchemaElement } from '@jsonforms/core';

@Directive()
export class JsonFormsBaseRenderer<T extends UISchemaElement> {
  @Input() uischema: T;
  @Input() schema: JsonSchema;
  @Input() path: string;

  protected getOwnProps(): OwnPropsOfRenderer {
    return {
      uischema: this.uischema,
      schema: this.schema,
      path: this.path,
    };
  }
}
