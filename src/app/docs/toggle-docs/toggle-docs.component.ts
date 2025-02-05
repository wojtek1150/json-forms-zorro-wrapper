import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-toggle-docs',
  templateUrl: './toggle-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, JsonPipe, EditorFormatterPipe, NzCodeEditorModule, FormsModule],
})
export class ToggleDocsComponent extends ControlDocsAbstract {
  override data = { done: false };
  data2 = { done: false };

  schema: JsonSchema = {
    type: 'object',
    properties: {
      done: {
        type: 'boolean',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Completed',
        scope: '#/properties/done',
      },
    ],
  };

  schema2: JsonSchema = {
    type: 'object',
    properties: {
      done: {
        type: 'boolean',
      },
    },
  };

  uiSchema2: JFZVerticalLayout = {
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
  };
}
