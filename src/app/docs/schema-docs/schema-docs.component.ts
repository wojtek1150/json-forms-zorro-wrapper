import { Component } from '@angular/core';

@Component({
  selector: 'app-schema-docs',
  templateUrl: './schema-docs.component.html',
})
export class SchemaDocsComponent {
  readonly STRING_TYPES = {
    RECORD: 'Record<string,any>',
  };
}
