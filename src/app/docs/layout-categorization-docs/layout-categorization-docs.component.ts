import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-layout-categorization-docs',
  templateUrl: './layout-categorization-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class LayoutCategorizationDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataCategorizationTabs: {
      firstName: 'John',
      lastName: 'Doe',
      city: 'Warsaw',
      postalCode: '00-001',
    },
    dataCategorizationStepper: {
      email: 'john.doe@example.com',
      phone: '+48111111111',
      accepted: true,
    },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaCategorizationTabs: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        city: { type: 'string' },
        postalCode: { type: 'string', maxLength: 6 },
      },
      required: ['firstName', 'lastName'],
    },
    schemaCategorizationStepper: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        accepted: { type: 'boolean' },
      },
      required: ['email', 'accepted'],
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaCategorizationTabs: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'Identity',
          elements: [
            { type: 'Control', label: 'First name', scope: '#/properties/firstName' },
            { type: 'Control', label: 'Last name', scope: '#/properties/lastName' },
          ],
        },
        {
          type: 'Category',
          label: 'Address',
          elements: [
            { type: 'Control', label: 'City', scope: '#/properties/city' },
            { type: 'Control', label: 'Postal code', scope: '#/properties/postalCode' },
          ],
        },
      ],
    } as any,
    uiSchemaCategorizationStepper: {
      type: 'Categorization',
      options: {
        variant: 'stepper',
        showNavButtons: true,
        nextLabel: 'Next step',
        previousLabel: 'Back',
      },
      elements: [
        {
          type: 'Category',
          label: 'Contact',
          elements: [
            { type: 'Control', label: 'Email', scope: '#/properties/email' },
            { type: 'Control', label: 'Phone', scope: '#/properties/phone' },
          ],
        },
        {
          type: 'Category',
          label: 'Confirmation',
          elements: [{ type: 'Control', label: 'Accept terms', scope: '#/properties/accepted' }],
        },
      ],
    } as any,
  };
}
