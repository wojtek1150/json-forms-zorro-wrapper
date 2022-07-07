import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControlWithDetail } from '../jsonForms';
import { ControlWithDetailProps, findUISchema, GroupLayout, isObjectControl, RankedTester, rankWith, setReadonly, UISchemaElement } from '@jsonforms/core';
import { isEmpty, startCase } from 'lodash-es';

@Component({
  selector: 'ObjectRenderer',
  template: `
    <jsonforms-outlet
      [uischema]="detailUiSchema"
      [schema]="scopedSchema"
      [path]="propsPath"
    >
    </jsonforms-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectControlRenderer extends JsonFormsControlWithDetail {
  detailUiSchema: UISchemaElement;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override mapAdditionalProps(props: ControlWithDetailProps) {
    this.detailUiSchema = findUISchema(
      props.uischemas,
      props.schema,
      props.uischema.scope,
      props.path,
      'Group',
      props.uischema,
      props.rootSchema
    );
    if (isEmpty(props.path)) {
      this.detailUiSchema.type = 'VerticalLayout';
    } else {
      (this.detailUiSchema as GroupLayout).label = startCase(props.path);
    }
    if (!this.isEnabled()) {
      setReadonly(this.detailUiSchema);
    }
  }
}

export const ObjectControlRendererTester: RankedTester = rankWith(
  2,
  isObjectControl
);
