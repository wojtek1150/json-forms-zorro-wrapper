import { maxBy } from 'lodash-es';
import { Directive, Input, OnDestroy, OnInit, Type, ViewContainerRef } from '@angular/core';
import {
  createId,
  getConfig,
  isControl,
  JsonFormsProps,
  JsonFormsState,
  JsonSchema,
  mapStateToJsonFormsRendererProps,
  OwnPropsOfRenderer,
  StatePropsOfJsonFormsRenderer,
} from '../core';
import { UnknownRenderer } from './unknown.component';
import { JsonFormsBaseRenderer } from './base.renderer';
import { Subject, takeUntil } from 'rxjs';
import { JsonFormsControl } from './control';
import { JsonFormsAngularService } from './jsonforms.service';

import { get, isEqual } from 'lodash-es';
import { JFZElement } from '../other/uischema';

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
  standalone: true,
})
export class JsonFormsOutlet extends JsonFormsBaseRenderer<JFZElement> implements OnInit, OnDestroy {
  private previousProps: StatePropsOfJsonFormsRenderer;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private jsonformsService: JsonFormsAngularService,
  ) {
    super();
  }

  @Input()
  set renderProps(renderProps: OwnPropsOfRenderer) {
    this.path = renderProps.path;
    this.schema = renderProps.schema;
    this.uischema = renderProps.uischema as JFZElement;
    this.update(this.jsonformsService.getState());
  }

  ngOnInit(): void {
    this.jsonformsService.$state.pipe(takeUntil(this.destroy$)).subscribe((state: JsonFormsState) => this.update(state));
  }

  update(state: JsonFormsState) {
    const props = mapStateToJsonFormsRendererProps(state, {
      schema: this.schema,
      uischema: this.uischema,
      path: this.path,
    });

    if (areEqual(this.previousProps, props)) {
      return;
    }
    this.previousProps = props;

    const { renderers } = props as JsonFormsProps;
    const schema: JsonSchema = this.schema || props.schema;
    const uischema = this.uischema || props.uischema;
    const testerContext = {
      rootSchema: props.rootSchema,
      config: getConfig(state),
    };

    const renderer = maxBy(renderers, r => r.tester(uischema, schema, testerContext));
    let bestComponent: Type<any> = UnknownRenderer;
    if (renderer !== undefined && renderer.tester(uischema, schema, testerContext) !== -1) {
      bestComponent = renderer.renderer;
    }

    this.viewContainerRef.clear();
    const currentComponentRef = this.viewContainerRef.createComponent(bestComponent);

    if (currentComponentRef.instance instanceof JsonFormsBaseRenderer) {
      const instance = currentComponentRef.instance as JsonFormsBaseRenderer<JFZElement>;
      instance.uischema = uischema as JFZElement;
      instance.schema = schema;
      instance.path = this.path;
      if (instance instanceof JsonFormsControl) {
        const controlInstance = instance as JsonFormsControl;
        if (controlInstance.id === undefined) {
          instance.id = isControl(props.uischema) ? createId(props.uischema.scope) : undefined;
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
