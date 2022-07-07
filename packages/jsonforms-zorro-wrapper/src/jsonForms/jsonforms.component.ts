import { maxBy } from 'lodash-es';
import { ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import {
  createId,
  isControl,
  JsonFormsProps,
  JsonFormsState,
  JsonSchema,
  mapStateToJsonFormsRendererProps,
  OwnPropsOfRenderer,
  StatePropsOfJsonFormsRenderer,
  UISchemaElement,
} from '@jsonforms/core';
import { UnknownRenderer } from './unknown.component';
import { JsonFormsBaseRenderer } from './base.renderer';
import { Subscription } from 'rxjs';
import { JsonFormsControl } from './control';
import { JsonFormsAngularService } from './jsonforms.service';

import { get, isEqual } from 'lodash';

const areEqual = (prevProps: StatePropsOfJsonFormsRenderer, nextProps: StatePropsOfJsonFormsRenderer) => {
  return (
    get(prevProps, 'renderers.length') === get(nextProps, 'renderers.length') &&
    get(prevProps, 'cells.length') === get(nextProps, 'cells.length') &&
    get(prevProps, 'uischemas.length') === get(nextProps, 'uischemas.length') &&
    get(prevProps, 'schema') === get(nextProps, 'schema') &&
    isEqual(get(prevProps, 'uischema'), get(nextProps, 'uischema')) &&
    get(prevProps, 'path') === get(nextProps, 'path')
  );
};

@Directive({
  selector: 'jsonforms-outlet',
})
export class JsonFormsOutlet extends JsonFormsBaseRenderer<UISchemaElement> implements OnInit, OnDestroy {
  private subscription: Subscription;
  private previousProps: StatePropsOfJsonFormsRenderer;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private jsonformsService: JsonFormsAngularService
  ) {
    super();
  }

  @Input()
  set renderProps(renderProps: OwnPropsOfRenderer) {
    this.path = renderProps.path;
    this.schema = renderProps.schema;
    this.uischema = renderProps.uischema;
    this.update(this.jsonformsService.getState());
  }

  ngOnInit(): void {
    this.subscription = this.jsonformsService.$state.subscribe({
      next: (state: JsonFormsState) => this.update(state),
    });
  }

  update(state: JsonFormsState) {
    const props = mapStateToJsonFormsRendererProps(state, {
      schema: this.schema,
      uischema: this.uischema,
      path: this.path,
    });
    if (areEqual(this.previousProps, props)) {
      return;
    } else {
      this.previousProps = props;
    }
    const { renderers } = props as JsonFormsProps;
    const schema: JsonSchema = this.schema || props.schema;
    const uischema = this.uischema || props.uischema;
    const rootSchema = props.rootSchema;

    const renderer = maxBy(renderers, r => r.tester(uischema, schema, rootSchema));
    let bestComponent: Type<any> = UnknownRenderer;
    if (renderer !== undefined && renderer.tester(uischema, schema, rootSchema) !== -1) {
      bestComponent = renderer.renderer;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(bestComponent);
    this.viewContainerRef.clear();
    const currentComponentRef = this.viewContainerRef.createComponent(componentFactory);

    if (currentComponentRef.instance instanceof JsonFormsBaseRenderer) {
      const instance = currentComponentRef.instance as JsonFormsBaseRenderer<UISchemaElement>;
      instance.uischema = uischema;
      instance.schema = schema;
      instance.path = this.path;
      if (instance instanceof JsonFormsControl) {
        const controlInstance = instance as JsonFormsControl;
        if (controlInstance.id === undefined) {
          const id = isControl(props.uischema) ? createId(props.uischema.scope) : undefined;
          (instance as JsonFormsControl).id = id;
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
