import { Rule } from "@jsonforms/core/src/models/uischema";

/**
 * @deprecated use JFZControlElement
 */
export interface ZorroControlElement extends JFZControlElement {}

type Options = { [key: string]: any };

export interface JFZElement {
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
   * Label for UI schema element.
   */
  label: string;

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
  placeholder: string;

  /**
   * An optional rule.
   */
  rule?: Rule;

  /**
   * Any additional options.
   */
  options?: Options;
}

/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
export interface JFZLayout extends JFZElement {
  /**
   * The child elements of this layout.
   */
  elements: JFZControlElement[];
  /**
   * Any additional options.
   */
  options?: {
    submitLabel?: string;
    /**
     * Determines if description should be parsed as html
     */
    html?: boolean;
  } & Options;
}

/**
 * A layout which orders its child elements vertically (i.e. from top to bottom).
 */
export interface JFZVerticalLayout extends JFZElement {
  type: 'VerticalLayout';
  /**
   * The child elements of this layout.
   */
  elements: JFZControlElement[];
  /**
   * Any additional options.
   */
  options?: {
    submitLabel?: string;
  } & Options;
}

/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface JFZHorizontalLayout extends JFZElement {
  type: 'HorizontalLayout';
  /**
   * The child elements of this layout.
   */
  elements: JFZControlElement[];
  /**
   * Any additional options.
   */
  options?: {
    submitLabel?: string;
  } & Options;
}

/**
 * A group resembles a vertical layout, but additionally might have a label and text/html description.
 * This layout is useful when grouping different elements by a certain criteria.
 */
export interface JFZGroupLayout extends JFZElement {
  type: 'Group';
  label?: string;
  description?: string;
  elements: JFZControlElement[];
  /**
   * Any additional options.
   */
  options?: {
    submitLabel?: string;
    /**
     * Determines if description should be parsed as html
     */
    html?: boolean;
  } & Options;
}

export interface JFZCardGroupLayout extends JFZElement {
  type: 'CardGroup';
  label: string;
  elements: JFZControlElement[];
  /**
   * Any additional options.
   */
  options?: Options;
}

/**
 * The category layout, mostly used within categorization
 */
export interface JFZCategoryLayout extends JFZElement {
  type: 'Category';
  label: string;
  elements: JFZGroupLayout[] | JFZControlElement[];
  /**
   * Any additional options.
   */
  options?: Options;
}

export interface JFZCategorizationSchema extends JFZElement {
  type: 'Categorization';
  options?: {
    variant?: 'stepper';
    showNavButtons?: boolean;
    nextLabel?: string; // default "Next"
    previousLabel?: string; // default "Previous"
    submitLabel?: string; // default "Submit"
  } & Options;
  elements: JFZCategoryLayout[];
}
