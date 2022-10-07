import { Component } from '@angular/core';

@Component({
  selector: 'app-jsonforms-docs',
  templateUrl: './json-forms-docs.component.html',
})
export class JsonFormsDocsComponent {
  readonly STRING_TYPES = {
    STEP_CHANGE: '{step: number; data: Object}',
  };
}
