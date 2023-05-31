import { JFZControlElement, JsonSchema7 } from '@wojtek1150/jsonforms-zorro-wrapper';

export enum JFZBuilderInputType {
  'TEXT' = 'TEXT',
  'NUMBER' = 'NUMBER',
  'DATE_PICKER' = 'DATE_PICKER',
  'RADIO' = 'RADIO',
  'CHECKBOX' = 'CHECKBOX',
  'SELECT' = 'SELECT',
}

export interface JFZBuilderControl {
  key?: string;
  icon: string;
  name: string;
  type: JFZBuilderInputType;
  temp: boolean;
  editor: boolean;
  uiSchema: JFZControlElement;
  formSchema: JsonSchema7;
}

export const jfzBuilderInputText: JFZBuilderControl = {
  icon: 'font-size',
  type: JFZBuilderInputType.TEXT,
  name: 'firstName',
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/firstName',
    label: 'Text Label',
  },
  formSchema: {
    type: 'string',
  },
};

export const jfzBuilderInputSelect: JFZBuilderControl = {
  icon: 'down-circle',
  type: JFZBuilderInputType.SELECT,
  name: 'Select',
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#',
    label: 'Select Label',
  },
  formSchema: {
    type: 'string',
    enum: [],
  },
};

export const jfzBuilderInputs = [jfzBuilderInputText, jfzBuilderInputSelect];
