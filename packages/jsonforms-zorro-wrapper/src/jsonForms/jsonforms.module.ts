import { NgModule } from '@angular/core';

import { JsonForms } from './jsonforms-root.component';
import { JsonFormsOutlet } from './jsonforms.component';
import { UnknownRenderer } from './unknown.component';
import { DescriptionRenderer } from './description.renderer';

@NgModule({
  imports: [DescriptionRenderer, JsonFormsOutlet, UnknownRenderer, JsonForms],
  exports: [JsonFormsOutlet, JsonForms, DescriptionRenderer],
})
export class JsonFormsModule {}
