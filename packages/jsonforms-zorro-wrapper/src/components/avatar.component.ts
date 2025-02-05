import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'jsonforms-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() url?: string | null;
}
