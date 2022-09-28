import { JFZControlElement } from '@wojtek1150/jsonforms-zorro-wrapper';

export type JFZBuilderInputType = 'Text' | 'Number' | 'DatePicker' | 'Radio' | 'Checkbox' | 'Select';

export interface JFZBuilderControl {
  key?: string;
  icon: string;
  name: string;
  type: JFZBuilderInputType;
  temp: boolean;
  editor: boolean;
  uiSchema: JFZControlElement;
}

export const jfzBuilderInputText: JFZBuilderControl = {
  icon: 'font-size',
  type: 'Text',
  name: 'Text',
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#',
    label: 'Text Label',
  },
};

export const jfzBuilderInputSelect: JFZBuilderControl = {
  icon: 'down-circle',
  type: 'Select',
  name: 'Select',
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#',
    label: 'Select Label',
  },
};

export const jfzBuilderInputs = [jfzBuilderInputText, jfzBuilderInputSelect];
