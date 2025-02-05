import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-schema-docs',
  templateUrl: './schema-docs.component.html',
  imports: [NzTableModule, NzAlertModule],
})
export class SchemaDocsComponent {
  readonly STRING_TYPES = {
    RECORD: 'Record<string,any>',
  };
}
