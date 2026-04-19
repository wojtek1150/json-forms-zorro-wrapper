import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-texfield-docs',
  templateUrl: './texfield-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class TexfieldDocsComponent extends ControlDocsAbstract {
  override schemaObjects: Record<string, JsonSchema> = {
    schemaName: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 3,
          errorMessage: {
            minLength: 'This is custom message for minLength',
            required: 'This is custom message for required error',
          },
        },
      },
      required: ['name'],
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaName: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'First name',
          type: 'Control',
          scope: '#/properties/name',
          messageBox: {
            type: 'warning',
            title: 'Warning',
            content: 'This is a warning message that will be displayed after the control',
          },
        },
      ],
    },
    uiSchemaArea: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'First name',
          type: 'Control',
          scope: '#/properties/name',
          options: {
            multi: true,
            minRows: 3,
            maxRows: 5,
          },
        },
      ],
    },
  };
}
