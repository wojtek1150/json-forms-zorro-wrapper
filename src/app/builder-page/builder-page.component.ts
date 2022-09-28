import { Component } from '@angular/core';
import { BuilderService } from './builder/builder.service';
import { JFZBuilderControl } from './builder/model';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
})
export class BuilderPageComponent {
  inputsTemp: Record<string, JFZBuilderControl> = {};

  constructor(public service: BuilderService) {}

  updateSchema(control: JFZBuilderControl, property: string, value: any) {
    const input = this.inputsTemp[control.key] || control;
    this.inputsTemp[input.key] = {
      ...input,
      uiSchema: { ...input.uiSchema, [property]: value },
    };
  }

  saveChanges(key: string): void {
    this.inputsTemp[key].editor = false;
    this.service.updateControlData(key, this.inputsTemp[key]);
  }

  openEditor(control: JFZBuilderControl) {
    const input = this.inputsTemp[control.key] || control;
    this.inputsTemp[control.key] = {
      ...input,
      editor: true,
    };
  }
}
