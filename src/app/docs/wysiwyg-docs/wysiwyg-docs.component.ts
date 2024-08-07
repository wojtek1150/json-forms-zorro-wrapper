import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-wysiwyg-docs',
  templateUrl: './wysiwyg-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule, JsonPipe, EditorFormatterPipe, NzCodeEditorComponent, FormsModule],
  styles: [
    `
      .flex {
        margin-top: 20px;
      }

      .flex pre {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class WysiwygDocsComponent extends ControlDocsAbstract {
  override data = {
    comment: '<p>Enter comment here</p>',
  };
  dataComplex = {
    personalData: {
      description: '<p>Enter comment here: <b>with some ipsum</b></p>',
    },
  };

  schema: JsonSchema = {
    type: 'object',
    properties: {
      comment: {
        type: 'string',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Comment',
        type: 'Control',
        scope: '#/properties/comment',
        options: {
          wysiwyg: true,
          formats: ['bold', 'italic', 'underline', 'link', 'list'],
        },
      },
    ],
  };

  schemaComplex: JsonSchema = {
    type: 'object',
    properties: {
      personalData: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
          },
          description_text: {
            type: 'string',
            maxLength: 30,
          },
        },
      },
    },
  };

  uiSchemaComplex: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Description',
        type: 'Control',
        scope: '#/properties/personalData/properties/description',
        options: {
          wysiwyg: true,
          withStringValidation: '_text',
          formats: ['bold', 'italic', 'underline', 'link', 'list'],
        },
      },
    ],
  };
}
