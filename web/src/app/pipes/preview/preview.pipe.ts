import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preview'
})
export class PreviewPipe implements PipeTransform {

  transform(value: string, length: number = 60): string {
    if (value.length > length) {
      return value.substring(0, length) + '...';
    }
    return value;
  }

}
