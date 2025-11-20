import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '../jsonForms';
import { JsonFormsState, mapStateToLayoutProps, OwnPropsOfRenderer, UISchemaElement } from '../core';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JFZLayout } from '../models/uischema';

@Directive()
export class LayoutRenderer<T extends JFZLayout> extends JsonFormsBaseRenderer<T> implements OnInit, OnDestroy {
  submitLabel: string = null;
  cancelLabel: string = null;
  submitLoading: boolean = false;
  htmlDescription: boolean = false;
  hidden = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private jsonFormsService: JsonFormsAngularService,
    protected changeDetectionRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {
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
    this.jsonFormsService.$state.pipe(takeUntil(this.destroy$)).subscribe((state: JsonFormsState) => {
      const props = mapStateToLayoutProps(state, this.getOwnProps());
      this.hidden = !props.visible;
      this.submitLoading = state.jsonforms.submitLoading;
      this.mapSchemaOptions(props.uischema.options);
      this.changeDetectionRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // @ts-ignore
  mapSchemaOptions(options: Record<string, any>) {
    this.submitLabel = options?.submitLabel || null;
    this.cancelLabel = options?.cancelLabel || null;
    this.htmlDescription = !!options?.html;
    // do nothing by default
  }

  submit() {
    this.jsonFormsService.submitForm();
  }

  cancel() {
    this.jsonFormsService.cancelForm();
  }

  trackElement(_index: number, renderProp: OwnPropsOfRenderer): string | null {
    return renderProp ? renderProp.path + JSON.stringify(renderProp.uischema) : null;
  }
}
