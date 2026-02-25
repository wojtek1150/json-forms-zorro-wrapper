import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { EditorFormatterPipe } from 'src/app/pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-schema-docs',
  templateUrl: './schema-docs.component.html',
  styles: [
    `
      section {
        padding: 20px 0;
        border-top: 1px solid #e0e0e0;

        p {
          margin-top: 0;
          font-weight: normal;
          color: #666;
        }

        jsonforms {
          display: block;
          margin-top: 20px;
        }
      }
    `,
  ],
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertComponent, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class SchemaDocsComponent extends ControlDocsAbstract {
  schema = null;
  uiSchema = null;

  override schemaObjects: Record<string, JsonSchema> = {
    schemaName: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaMessageBox: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Name',
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
    uiSchemaHtml: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Name',
          type: 'Control',
          scope: '#/properties/name',
          description: `This is a description that will be <strong>parsed</strong> as html and displayed as html
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>`,
          options: {
            html: true,
          },
        },
      ],
    },
    uiSchemaShowValidationStatus: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Name',
          type: 'Control',
          scope: '#/properties/name',
          options: {
            showValidationStatus: true,
          },
        },
      ],
    },
  };

  readonly STRING_TYPES = {
    RECORD: 'Record<string,any>',
  };
}
