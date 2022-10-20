import { Component } from '@angular/core';
import { BuilderService } from './builder/builder.service';
import { JFZBuilderControl, JFZBuilderInputType } from './builder/model';
import { ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
})
export class BuilderPageComponent {
  readonly TYPES = JFZBuilderInputType;
  readonly renderers = ngZorroRenderers;
  inputsTemp: Record<string, JFZBuilderControl> = {};
  formData = {};

  constructor(public service: BuilderService) {}

  updateUiSchema(control: JFZBuilderControl, property: string, value: any): void {
    const input = this.getFieldFromTemp(control);
    this.inputsTemp[input.key] = {
      ...input,
      uiSchema: { ...input.uiSchema, [property]: value },
    };
  }

  openEditor(control: JFZBuilderControl): void {
    const input = this.inputsTemp[control.key] || control;
    this.inputsTemp[control.key] = {
      ...input,
      editor: true,
    };
  }

  updateControl(control: JFZBuilderControl): void {
    this.inputsTemp[control.key] = control;
  }

  updateControlName(control: JFZBuilderControl, name: string): void {
    const input = this.getFieldFromTemp(control);
    this.inputsTemp[input.key] = {
      ...input,
      name,
      uiSchema: { ...input.uiSchema, scope: '#/properties/' + name },
    };
  }

  saveChanges(key: string): void {
    this.inputsTemp[key].editor = false;
    this.service.updateControlData(key, this.inputsTemp[key]);
  }

  removeField(key: string): void {
    delete this.inputsTemp[key];
    this.service.updateControlData(key, null);
  }

  private getFieldFromTemp(control: JFZBuilderControl): JFZBuilderControl {
    return this.inputsTemp[control.key] || control;
  }
}
