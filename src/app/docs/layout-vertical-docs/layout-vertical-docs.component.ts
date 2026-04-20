import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-layout-vertical-docs',
  templateUrl: './layout-vertical-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class LayoutVerticalDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataVerticalBasic: {
      name: 'John Doe',
      birthDate: '1985-06-02',
      occupation: 'Software Engineer',
    },
    dataVerticalNested: {
      firstName: 'John',
      lastName: 'Doe',
      personalData: {
        age: 34,
        height: 1.82,
      },
    },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaVerticalBasic: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 3 },
        birthDate: { type: 'string', format: 'date' },
        occupation: { type: 'string' },
      },
      required: ['name'],
    },
    schemaVerticalNested: {
      type: 'object',
      properties: {
        firstName: { type: 'string', minLength: 2 },
        lastName: { type: 'string', minLength: 2 },
        personalData: {
          type: 'object',
          properties: {
            age: { type: 'integer', minimum: 0 },
            height: { type: 'number', minimum: 0 },
          },
          required: ['age'],
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaVerticalBasic: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', label: 'Name', scope: '#/properties/name' },
        { type: 'Control', label: 'Birth Date', scope: '#/properties/birthDate' },
        { type: 'Control', label: 'Occupation', scope: '#/properties/occupation' },
      ],
    },
    uiSchemaVerticalNested: {
      type: 'VerticalLayout',
      elements: [
        { type: 'Control', label: 'First Name', scope: '#/properties/firstName' },
        { type: 'Control', label: 'Last Name', scope: '#/properties/lastName' },
        {
          type: 'VerticalLayout',
          label: 'Personal Data',
          elements: [
            { type: 'Control', label: 'Age', scope: '#/properties/personalData/properties/age' },
            { type: 'Control', label: 'Height', scope: '#/properties/personalData/properties/height' },
          ],
        } as any,
      ],
    },
  };
}
