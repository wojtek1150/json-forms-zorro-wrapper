import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  angularMaterialRenderers = angularMaterialRenderers;
}
