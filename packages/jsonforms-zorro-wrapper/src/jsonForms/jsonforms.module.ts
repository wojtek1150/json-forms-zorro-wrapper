import { NgModule } from '@angular/core';

import { JsonForms } from './jsonforms-root.component';
import { JsonFormsOutlet } from './jsonforms.component';
import { UnknownRenderer } from './unknown.component';
import { DescriptionRenderer } from './description.renderer';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [JsonFormsOutlet, UnknownRenderer, JsonForms, DescriptionRenderer],
  entryComponents: [UnknownRenderer],
  exports: [JsonFormsOutlet, JsonForms, DescriptionRenderer],
})
export class JsonFormsModule {}
