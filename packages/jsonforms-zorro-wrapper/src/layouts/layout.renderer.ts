import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '../jsonForms';
import { JsonFormsState, Layout, mapStateToLayoutProps, OwnPropsOfRenderer, UISchemaElement } from '@jsonforms/core';
import { Subscription } from 'rxjs';

@Directive()
export class LayoutRenderer<T extends Layout> extends JsonFormsBaseRenderer<T> implements OnInit, OnDestroy {
  submitLabel: string = null;
  hidden = false;
  private subscription = new Subscription();

  constructor(private jsonFormsService: JsonFormsAngularService, protected changeDetectionRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        this.hidden = !props.visible;
        this.mapSchemaOptions(props.uischema.options);
        this.changeDetectionRef.markForCheck();
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get renderProps(): OwnPropsOfRenderer[] {
    return (this.uischema.elements || []).map((el: UISchemaElement) => ({
      uischema: el,
      schema: this.schema,
      path: this.path,
    }));
  }

  // @ts-ignore
  mapSchemaOptions(options: Record<string, any>) {
    this.submitLabel = options?.submitLabel || null;
    // do nothing by default
  }

  submit() {
    this.jsonFormsService.submitForm();
  }

  trackElement(_index: number, renderProp: OwnPropsOfRenderer): string | null {
    return renderProp ? renderProp.path + JSON.stringify(renderProp.uischema) : null;
  }
}
