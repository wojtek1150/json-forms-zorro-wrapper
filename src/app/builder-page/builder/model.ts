import {
  JFZControlElement,
  JFZVerticalLayout,
  JFZHorizontalLayout,
  JFZGroupLayout,
  JFZCardGroupLayout,
  JFZCategorizationSchema, JsonSchema7
} from '@wojtek1150/jsonforms-zorro-wrapper';

export enum JFZBuilderInputType {
  'TEXT' = 'TEXT',
  'TEXTAREA' = 'TEXTAREA',
  'NUMBER' = 'NUMBER',
  'BOOLEAN' = 'CHECKBOX',
  'TOGGLE' = 'TOGGLE',
  'DATE_PICKER' = 'DATE_PICKER',
  'DATE_RANGE' = 'DATE_RANGE',
  'SELECT' = 'SELECT',
  'RADIO' = 'RADIO',
  'RADIO_BUTTON' = 'RADIO_BUTTON',
  'RANGE' = 'RANGE',
  'WYSIWYG' = 'WYSIWYG',
  'CHECKBOX_GROUP' = 'CHECKBOX_GROUP',
  'MULTISELECT' = 'MULTISELECT',
  'MENTION' = 'MENTION',
  'IMAGE' = 'IMAGE',
  'GOOGLE_PLACES' = 'GOOGLE_PLACES',
  'COUNTRY_ISO' = 'COUNTRY_ISO',
}

export enum JFZBuilderLayoutType {
  'VERTICAL_LAYOUT' = 'VERTICAL_LAYOUT',
  'HORIZONTAL_LAYOUT' = 'HORIZONTAL_LAYOUT',
  'GROUP' = 'GROUP',
  'CARD_GROUP' = 'CARD_GROUP',
  'CATEGORIZATION' = 'CATEGORIZATION',
  'STEPPER' = 'STEPPER',
  'ARRAY_LAYOUT' = 'ARRAY_LAYOUT',
}

export interface JFZBuilderControl {
  key?: string;
  icon: string;
  name: string;
  type: JFZBuilderInputType;
  temp: boolean;
  editor: boolean;
  disabled?: boolean; // Mark controls as disabled if they don't work correctly
  uiSchema: JFZControlElement;
  formSchema: JsonSchema7;
}

export interface JFZBuilderLayout {
  key?: string;
  icon: string;
  label: string;
  type: JFZBuilderLayoutType;
  temp: boolean;
  editor: boolean;
  uiSchema: JFZVerticalLayout | JFZHorizontalLayout | JFZGroupLayout | JFZCardGroupLayout | JFZCategorizationSchema | any;
  elements: JFZBuilderItem[];
}

export type JFZBuilderItem = JFZBuilderControl | JFZBuilderLayout;

// Helper function to generate unique field names
function getDefaultFieldName(prefix: string, counter: number = 0): string {
  return counter > 0 ? `${prefix}${counter}` : prefix;
}

// ==================== CONTROLS ====================

export const jfzBuilderInputText: JFZBuilderControl = {
  icon: 'font-size',
  type: JFZBuilderInputType.TEXT,
  name: getDefaultFieldName('textField'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/textField',
    label: 'Text Field',
  },
  formSchema: {
    type: 'string',
  },
};

export const jfzBuilderInputTextarea: JFZBuilderControl = {
  icon: 'file-text',
  type: JFZBuilderInputType.TEXTAREA,
  name: getDefaultFieldName('textarea'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/textarea',
    label: 'Textarea',
    options: {
      multi: true,
      minRows: 2,
      maxRows: 4,
    },
  },
  formSchema: {
    type: 'string',
  },
};

export const jfzBuilderInputNumber: JFZBuilderControl = {
  icon: 'number',
  type: JFZBuilderInputType.NUMBER,
  name: getDefaultFieldName('number'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/number',
    label: 'Number',
  },
  formSchema: {
    type: 'number',
  },
};

export const jfzBuilderInputBoolean: JFZBuilderControl = {
  icon: 'check-square',
  type: JFZBuilderInputType.BOOLEAN,
  name: getDefaultFieldName('boolean'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/boolean',
    label: 'Checkbox',
  },
  formSchema: {
    type: 'boolean',
  },
};

export const jfzBuilderInputToggle: JFZBuilderControl = {
  icon: 'swap',
  type: JFZBuilderInputType.TOGGLE,
  name: getDefaultFieldName('toggle'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/toggle',
    label: 'Toggle',
    options: {
      toggle: true,
    },
  },
  formSchema: {
    type: 'boolean',
  },
};

export const jfzBuilderInputDate: JFZBuilderControl = {
  icon: 'calendar',
  type: JFZBuilderInputType.DATE_PICKER,
  name: getDefaultFieldName('date'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/date',
    label: 'Date',
    options: {
      format: 'date',
      dateFormat: 'yyyy-MM-dd',
      showTime: false,
    },
  },
  formSchema: {
    type: 'string',
    format: 'date',
  },
};

export const jfzBuilderInputDateRange: JFZBuilderControl = {
  icon: 'calendar',
  type: JFZBuilderInputType.DATE_RANGE,
  name: getDefaultFieldName('dateRange'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/dateRange',
    label: 'Date Range',
    options: {
      format: 'dateRange',
      dateFormat: 'yyyy-MM-dd',
      saveFormat: "yyyy-MM-dd'T'HH:mm:ss",
    },
  },
  formSchema: {
    type: 'array',
    items: {
      type: 'string',
      format: 'date',
    },
  },
};

export const jfzBuilderInputSelect: JFZBuilderControl = {
  icon: 'down-circle',
  type: JFZBuilderInputType.SELECT,
  name: getDefaultFieldName('select'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/select',
    label: 'Select',
  },
  formSchema: {
    type: 'string',
    enum: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const jfzBuilderInputRadio: JFZBuilderControl = {
  icon: 'radar-chart',
  type: JFZBuilderInputType.RADIO,
  name: getDefaultFieldName('radio'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/radio',
    label: 'Radio',
    options: {
      format: 'radio',
    },
  },
  formSchema: {
    type: 'string',
    enum: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const jfzBuilderInputRadioButton: JFZBuilderControl = {
  icon: 'dot-chart',
  type: JFZBuilderInputType.RADIO_BUTTON,
  name: getDefaultFieldName('radioButton'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/radioButton',
    label: 'Radio Button',
    options: {
      format: 'radio-button',
    },
  },
  formSchema: {
    type: 'string',
    enum: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const jfzBuilderInputRange: JFZBuilderControl = {
  icon: 'sliders',
  type: JFZBuilderInputType.RANGE,
  name: getDefaultFieldName('range'),
  temp: false,
  editor: false,
  disabled: true, // Disabled - not working correctly
  uiSchema: {
    type: 'Control',
    scope: '#/properties/range',
    label: 'Range',
  },
  formSchema: {
    type: 'number',
    minimum: 0,
    maximum: 100,
  },
};

export const jfzBuilderInputWysiwyg: JFZBuilderControl = {
  icon: 'edit',
  type: JFZBuilderInputType.WYSIWYG,
  name: getDefaultFieldName('wysiwyg'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/wysiwyg',
    label: 'Rich Text Editor',
    options: {
      wysiwyg: true,
    },
  },
  formSchema: {
    type: 'string',
  },
};

export const jfzBuilderInputCheckboxGroup: JFZBuilderControl = {
  icon: 'check-square',
  type: JFZBuilderInputType.CHECKBOX_GROUP,
  name: getDefaultFieldName('checkboxGroup'),
  temp: false,
  editor: false,
  disabled: true, // Disabled - not working correctly
  uiSchema: {
    type: 'Control',
    scope: '#/properties/checkboxGroup',
    label: 'Checkbox Group',
  },
  formSchema: {
    type: 'array',
    items: {
      type: 'string',
      enum: ['Option 1', 'Option 2', 'Option 3'],
    },
  },
};

export const jfzBuilderInputMultiselect: JFZBuilderControl = {
  icon: 'unordered-list',
  type: JFZBuilderInputType.MULTISELECT,
  name: getDefaultFieldName('multiselect'),
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Control',
    scope: '#/properties/multiselect',
    label: 'Multiselect',
    options: {
      format: 'multiselect',
    },
  },
  formSchema: {
    type: 'array',
    items: {
      type: 'string',
      enum: ['Option 1', 'Option 2', 'Option 3'],
    },
    uniqueItems: true,
  },
};

export const jfzBuilderInputMention: JFZBuilderControl = {
  icon: 'at',
  type: JFZBuilderInputType.MENTION,
  name: getDefaultFieldName('mention'),
  temp: false,
  editor: false,
  disabled: true, // Disabled - not working correctly
  uiSchema: {
    type: 'Control',
    scope: '#/properties/mention',
    label: 'Mention',
    options: {
      format: 'mention',
    },
  },
  formSchema: {
    type: 'string',
  },
};

export const jfzBuilderInputImage: JFZBuilderControl = {
  icon: 'picture',
  type: JFZBuilderInputType.IMAGE,
  name: getDefaultFieldName('image'),
  temp: false,
  editor: false,
  disabled: true, // Disabled - not working correctly
  uiSchema: {
    type: 'Control',
    scope: '#/properties/image',
    label: 'Image Upload',
  },
  formSchema: {
    type: 'string',
    format: 'uri',
  },
};

export const jfzBuilderInputGooglePlaces: JFZBuilderControl = {
  icon: 'environment',
  type: JFZBuilderInputType.GOOGLE_PLACES,
  name: getDefaultFieldName('googlePlaces'),
  temp: false,
  editor: false,
  disabled: true, // Disabled - not working correctly
  uiSchema: {
    type: 'Control',
    scope: '#/properties/googlePlaces',
    label: 'Google Places',
  },
  formSchema: {
    type: 'object',
    properties: {
      address: { type: 'string' },
      placeId: { type: 'string' },
    },
  },
};

export const jfzBuilderInputCountryIso: JFZBuilderControl = {
  icon: 'global',
  type: JFZBuilderInputType.COUNTRY_ISO,
  name: getDefaultFieldName('country'),
  temp: false,
  editor: false,
  disabled: true, // Disabled - not working correctly
  uiSchema: {
    type: 'Control',
    scope: '#/properties/country',
    label: 'Country',
  },
  formSchema: {
    type: 'string',
  },
};

// ==================== LAYOUTS ====================

export const jfzBuilderLayoutVertical: JFZBuilderLayout = {
  icon: 'align-left',
  label: 'Vertical Layout',
  type: JFZBuilderLayoutType.VERTICAL_LAYOUT,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'VerticalLayout',
    elements: [],
  },
  elements: [],
};

export const jfzBuilderLayoutHorizontal: JFZBuilderLayout = {
  icon: 'menu',
  label: 'Horizontal Layout',
  type: JFZBuilderLayoutType.HORIZONTAL_LAYOUT,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'HorizontalLayout',
    elements: [],
  },
  elements: [],
};

export const jfzBuilderLayoutGroup: JFZBuilderLayout = {
  icon: 'appstore',
  label: 'Group',
  type: JFZBuilderLayoutType.GROUP,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Group',
    label: 'Group',
    elements: [],
  },
  elements: [],
};

export const jfzBuilderLayoutCardGroup: JFZBuilderLayout = {
  icon: 'idcard',
  label: 'Card Group',
  type: JFZBuilderLayoutType.CARD_GROUP,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'CardGroup',
    label: 'Card Group',
    elements: [],
  },
  elements: [],
};

export const jfzBuilderLayoutCategorization: JFZBuilderLayout = {
  icon: 'appstore-add',
  label: 'Categorization',
  type: JFZBuilderLayoutType.CATEGORIZATION,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Category 1',
        elements: [],
      },
    ],
    options: {},
  },
  elements: [],
};

export const jfzBuilderLayoutStepper: JFZBuilderLayout = {
  icon: 'step-forward',
  label: 'Stepper',
  type: JFZBuilderLayoutType.STEPPER,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'Categorization',
    elements: [
      {
        type: 'Category',
        label: 'Step 1',
        elements: [],
      },
    ],
    options: {
      variant: 'stepper',
      showNavButtons: true,
      nextLabel: 'Next',
      previousLabel: 'Previous',
    },
  },
  elements: [],
};

export const jfzBuilderLayoutArray: JFZBuilderLayout = {
  icon: 'unordered-list',
  label: 'Array Layout',
  type: JFZBuilderLayoutType.ARRAY_LAYOUT,
  temp: false,
  editor: false,
  uiSchema: {
    type: 'VerticalLayout',
    elements: [],
  },
  elements: [],
};

// ==================== EXPORTS ====================

export const jfzBuilderControls: JFZBuilderControl[] = [
  jfzBuilderInputText,
  jfzBuilderInputTextarea,
  jfzBuilderInputNumber,
  jfzBuilderInputBoolean,
  jfzBuilderInputToggle,
  jfzBuilderInputDate,
  jfzBuilderInputDateRange,
  jfzBuilderInputSelect,
  jfzBuilderInputRadio,
  jfzBuilderInputRadioButton,
  jfzBuilderInputRange,
  jfzBuilderInputWysiwyg,
  jfzBuilderInputCheckboxGroup,
  jfzBuilderInputMultiselect,
  jfzBuilderInputMention,
  jfzBuilderInputImage,
  jfzBuilderInputGooglePlaces,
  jfzBuilderInputCountryIso,
];

export const jfzBuilderLayouts: JFZBuilderLayout[] = [
  jfzBuilderLayoutVertical,
  jfzBuilderLayoutHorizontal,
  jfzBuilderLayoutGroup,
  jfzBuilderLayoutCardGroup,
  jfzBuilderLayoutCategorization,
  jfzBuilderLayoutStepper,
  jfzBuilderLayoutArray,
];

// Legacy export for backward compatibility
export const jfzBuilderInputs = jfzBuilderControls;
