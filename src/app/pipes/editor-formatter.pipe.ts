import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'editorFormatter' })
export class EditorFormatterPipe implements PipeTransform {
  transform(schema: any): string {
    return JSON.stringify(schema, null, 2);
  }
}
