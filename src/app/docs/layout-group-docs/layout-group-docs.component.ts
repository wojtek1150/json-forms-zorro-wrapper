import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-layout-group-docs',
  templateUrl: './layout-group-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class LayoutGroupDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataGroupBasic: {
      name: 'John Doe',
      birthDate: '1985-06-02',
    },
    dataGroupNested: {
      street: 'Main Street 10',
      city: 'Warsaw',
      postalCode: '00-001',
    },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaGroupBasic: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 3 },
        birthDate: { type: 'string', format: 'date' },
      },
    },
    schemaGroupNested: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        postalCode: { type: 'string', maxLength: 6 },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaGroupBasic: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Personal data',
          elements: [
            { type: 'Control', label: 'Name', scope: '#/properties/name' },
            { type: 'Control', label: 'Birth Date', scope: '#/properties/birthDate' },
          ],
        } as any,
      ],
    },
    uiSchemaGroupNested: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Address',
          description: 'This group combines address fields in one section.',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                { type: 'Control', label: 'Street', scope: '#/properties/street' },
                { type: 'Control', label: 'City', scope: '#/properties/city' },
              ],
            },
            { type: 'Control', label: 'Postal Code', scope: '#/properties/postalCode' },
          ],
        } as any,
      ],
    },
  };
}
