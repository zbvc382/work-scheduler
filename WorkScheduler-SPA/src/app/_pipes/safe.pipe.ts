import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class Safe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
