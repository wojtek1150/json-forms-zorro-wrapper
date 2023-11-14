import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-jsonforms-docs',
  templateUrl: './json-forms-docs.component.html',
  standalone: true,
  imports: [NzTableModule],
})
export class JsonFormsDocsComponent {
  readonly STRING_TYPES = {
    STEP_CHANGE: '{step: number; data: Object}',
  };
}
