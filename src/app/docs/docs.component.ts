import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzTagComponent } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  imports: [NzLayoutModule, NzMenuModule, RouterLink, RouterOutlet, NzTagComponent],
})
export class DocsComponent {}
