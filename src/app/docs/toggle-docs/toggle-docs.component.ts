import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-toggle-docs',
  templateUrl: './toggle-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, EditorFormatterPipe, NzCodeEditorModule, FormsModule],
})
export class ToggleDocsComponent extends ControlDocsAbstract {
  schema = null;
  uiSchema = null;

  override dataObjects: Record<string, any> = {
    dataCheckbox: { done: false },
    dataToggle: { done: false },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaCheckbox: {
      type: 'object',
      properties: {
        done: {
          type: 'boolean',
        },
      },
    },
    schemaToggle: {
      type: 'object',
      properties: {
        done: {
          type: 'boolean',
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaCheckbox: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Completed',
          scope: '#/properties/done',
        },
      ],
    },
    uiSchemaToggle: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Completed',
          scope: '#/properties/done',
          options: {
            toggle: true,
          },
        },
      ],
    },
  };
}
