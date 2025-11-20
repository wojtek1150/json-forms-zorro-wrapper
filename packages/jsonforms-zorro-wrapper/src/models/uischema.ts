import { Rule, UISchemaElement } from '../core';

/**
 * @deprecated use JFZControlElement
 */
export interface ZorroControlElement extends JFZControlElement {}

export interface UiSchemaLayoutBaseOptions extends Record<string, any> {
  /**
   * Determines if description should be parsed as html
   */
  html?: boolean;

  /**
   * If set displays submit button with given label
   */
  submitLabel?: string;
};

export interface UiSchemaControlBaseOptions extends Record<string, any> {
  /**
   /**
    * If true, show the validation status for the control.
    * The status values are mapped from NzValidationStatusPipe:
    * 'PENDING' => 'validating', 'WARNING' => 'warning', 'INVALID' => 'error', 'VALID' => 'success'
    */
  showValidationStatus?: boolean;

  /**
   * Determines if description should be parsed as html
   */
  html?: boolean;
}

export interface JFZElement<ControlOptions extends UiSchemaControlBaseOptions = UiSchemaControlBaseOptions> extends UISchemaElement {
  /**
   * The type of this UI schema element.
   */
  type: string;

  /**
   * An optional rule.
   */
  rule?: Rule;

  /**
   * Any additional options.
   */
  options?: ControlOptions;

  /**
   * Label for UI schema element.
   */
  label?: string;

  /**
   * Additional content displayed below label. Can be displayed as html,
   *
   * @see Options.html
   */
  description?: string;
}

/**
 * A control element. The scope property of the control determines
 * to which part of the schema the control should be bound.
 */
export interface JFZControlElement<ControlOptions = UiSchemaControlBaseOptions> extends JFZElement<ControlOptions> {
  /**
   * The type of this UI schema element.
   */
  type: 'Control';

  /**
   * The scope that determines to which part this element should be bound to.
   */
  scope: string;

  /**
   * Label for UI schema element. To hide set as empty string
   */
  label: string;

  /**
   * Additional content displayed below label. Can be displayed as html,
   *
   * @see Options.html
   */
  description?: string;

  /**
   * NgZorro icon name before label
   */
  labelIcon?: string;

  /**
   * Custom error message that overwrites AJV error messages
   */
  errorMessage?: string;

  /**
   * Placeholder displayed inside element.
   */
  placeholder?: string;

  /**
   * An optional rule.
   */
  rule?: Rule;
}

/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
export interface JFZLayout extends JFZElement {
  /**
   * Title as H2 element
   */
  label?: string;

  /**
   * Additional content displayed below label. Can be displayed as html,
   *
   * @see Options.html
   */
  description?: string;
  /**
   * The child elements of this layout, can be list of controls or subgroup of layouts
   */
  elements: JFZControlElement[] | JFZLayout[];
  /**
   * Any additional options.
   */
  options?: UiSchemaLayoutBaseOptions;
}

/**
 * A layout which orders its child elements vertically (i.e. from top to bottom).
 * For non-documented properties check JFZLayout properties
 *
 * @see JFZLayout
 */
export interface JFZVerticalLayout extends JFZLayout {
  label?: string;
  description?: string;
  type: 'VerticalLayout';
  elements: JFZControlElement[] | JFZLayout[];
  options?: UiSchemaLayoutBaseOptions;
}

/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface JFZHorizontalLayout extends JFZLayout {
  label?: string;
  description?: string;
  type: 'HorizontalLayout';
  elements: JFZControlElement[] | JFZLayout[];
  options?: UiSchemaLayoutBaseOptions;
}

/**
 * A group resembles a vertical layout, but additionally might have a label and text/html description.
 * This layout is useful when grouping different elements by a certain criteria.
 */
export interface JFZGroupLayout extends JFZLayout {
  type: 'Group';
  label?: string;
  description?: string;
  elements: JFZControlElement[] | JFZLayout[];
  options?: UiSchemaLayoutBaseOptions;
}

export interface JFZCardGroupLayout extends JFZLayout {
  type: 'CardGroup';
  label: string;
  description?: string;
  elements: JFZControlElement[] | JFZLayout[];
  options?: UiSchemaLayoutBaseOptions;
}

/**
 * The category layout, mostly used within categorization
 */
export interface JFZCategoryLayout extends JFZLayout {
  type: 'Category';
  label: string;
  description?: string;
  elements: JFZGroupLayout[] | JFZLayout[];
  options?: UiSchemaLayoutBaseOptions;
}

export interface JFZCategorizationSchema extends JFZLayout {
  type: 'Categorization';
  options?: {
    variant?: 'stepper';
    showNavButtons?: boolean;
    nextLabel?: string; // default "Next"
    previousLabel?: string; // default "Previous"
  } & UiSchemaLayoutBaseOptions;
  elements: JFZCategoryLayout[] | JFZLayout[];
}
