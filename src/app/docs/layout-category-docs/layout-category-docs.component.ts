import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-layout-category-docs',
  templateUrl: './layout-category-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class LayoutCategoryDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataCategorySingle: {
      name: 'John Doe',
      birthDate: '1985-06-02',
    },
    dataCategoryWithGroup: {
      firstName: 'John',
      lastName: 'Doe',
      city: 'Warsaw',
      postalCode: '00-001',
    },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaCategorySingle: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 3 },
        birthDate: { type: 'string', format: 'date' },
      },
    },
    schemaCategoryWithGroup: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        city: { type: 'string' },
        postalCode: { type: 'string', maxLength: 6 },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaCategorySingle: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Personal data',
          elements: [
            { type: 'Control', label: 'Name', scope: '#/properties/name' },
            { type: 'Control', label: 'Birth Date', scope: '#/properties/birthDate' },
          ],
        },
      ],
    } as any,
    uiSchemaCategoryWithGroup: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Identity',
          elements: [
            {
              type: 'Group',
              label: 'Basic details',
              elements: [
                { type: 'Control', label: 'First name', scope: '#/properties/firstName' },
                { type: 'Control', label: 'Last name', scope: '#/properties/lastName' },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Address',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                { type: 'Control', label: 'City', scope: '#/properties/city' },
                { type: 'Control', label: 'Postal code', scope: '#/properties/postalCode' },
              ],
            },
          ],
        },
      ],
    } as any,
  };
}
