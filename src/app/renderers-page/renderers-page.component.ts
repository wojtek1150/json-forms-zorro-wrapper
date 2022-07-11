import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-renderers-page',
  templateUrl: './renderers-page.component.html',
  styleUrls: ['./renderers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderersPageComponent {}
