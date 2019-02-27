import { Pipe, PipeTransform, Injectable} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat'
  })
  @Injectable()
  export class DateFormat extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
       return super.transform(value, 'yyyy-MM-ddTHH:mm:ss');
    }
  }
