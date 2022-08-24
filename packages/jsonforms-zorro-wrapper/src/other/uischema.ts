import { Rule, UISchemaElement } from "@jsonforms/core/src/models/uischema";
import { Layout } from "@jsonforms/core";

/**
 * @deprecated use JFZControlElement
 */
export interface ZorroControlElement extends JFZControlElement {}

/**
 * A control element. The scope property of the control determines
 * to which part of the schema the control should be bound.
 */
export interface JFZControlElement extends UISchemaElement {
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
  options?: { [key: string]: any };
}

/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
export interface JFZLayout extends Layout {
  /**
   * The child elements of this layout.
   */
  elements: JFZControlElement[];
}
