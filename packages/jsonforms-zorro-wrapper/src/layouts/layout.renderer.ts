import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '../jsonForms';
import { JsonFormsState, Layout, mapStateToLayoutProps, OwnPropsOfRenderer, UISchemaElement } from '@jsonforms/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive()
export class LayoutRenderer<T extends Layout> extends JsonFormsBaseRenderer<T> implements OnInit, OnDestroy {
  submitLabel: string = null;
  htmlDescription: boolean = false;
  hidden = false;
  private subscription = new Subscription();

  constructor(private jsonFormsService: JsonFormsAngularService, protected changeDetectionRef: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    super();
  }

  get renderProps(): OwnPropsOfRenderer[] {
    return (this.uischema.elements || []).map((el: UISchemaElement) => ({
      uischema: el,
      schema: this.schema,
      path: this.path,
    }));
  }

  get sanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.uischema['description']);
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

  // @ts-ignore
  mapSchemaOptions(options: Record<string, any>) {
    this.submitLabel = options?.submitLabel || null;
    this.htmlDescription = !!options?.html;
    // do nothing by default
  }

  submit() {
    this.jsonFormsService.submitForm();
  }

  trackElement(_index: number, renderProp: OwnPropsOfRenderer): string | null {
    return renderProp ? renderProp.path + JSON.stringify(renderProp.uischema) : null;
  }
}
