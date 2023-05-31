import { Rule, UISchemaElement } from '../core';

/**
 * @deprecated use JFZControlElement
 */
export interface ZorroControlElement extends JFZControlElement {}

type Options = {
  /**
   * Determines if description should be parsed as html
   */
  html?: boolean;

  [key: string]: any;
};

export interface JFZElement extends UISchemaElement {
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
  options?: Options;

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
export interface JFZControlElement extends JFZElement {
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

  /**
   * Any additional options.
   */
  options?: { showValidationStatus?: boolean } & Options;
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
  options?: {
    /**
     * If set displays submit button with given label
     */
    submitLabel?: string;
  } & Options;
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
  options?: {
    submitLabel?: string;
  } & Options;
}

/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface JFZHorizontalLayout extends JFZLayout {
  label?: string;
  description?: string;
  type: 'HorizontalLayout';
  elements: JFZControlElement[] | JFZLayout[];
  options?: {
    submitLabel?: string;
  } & Options;
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
  options?: {
    submitLabel?: string;
  } & Options;
}

export interface JFZCardGroupLayout extends JFZLayout {
  type: 'CardGroup';
  label: string;
  description?: string;
  elements: JFZControlElement[] | JFZLayout[];
  options?: Options;
}

/**
 * The category layout, mostly used within categorization
 */
export interface JFZCategoryLayout extends JFZLayout {
  type: 'Category';
  label: string;
  description?: string;
  elements: JFZGroupLayout[] | JFZLayout[];
  options?: Options;
}

export interface JFZCategorizationSchema extends JFZLayout {
  type: 'Categorization';
  options?: {
    variant?: 'stepper';
    showNavButtons?: boolean;
    nextLabel?: string; // default "Next"
    previousLabel?: string; // default "Previous"
    submitLabel?: string; // default "Submit"
  } & Options;
  elements: JFZCategoryLayout[] | JFZLayout[];
}
