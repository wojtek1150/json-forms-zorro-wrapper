import { NgModule } from '@angular/core';

import { JsonForms } from './jsonforms-root.component';
import { JsonFormsOutlet } from './jsonforms.component';
import { UnknownRenderer } from './unknown.component';

@NgModule({
  declarations: [JsonFormsOutlet, UnknownRenderer, JsonForms],
  entryComponents: [UnknownRenderer],
  exports: [JsonFormsOutlet, JsonForms],
})
export class JsonFormsModule {}
