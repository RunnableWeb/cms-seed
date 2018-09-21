import { Injectable } from '@angular/core';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private _translateService: TranslateService,
    private _datePipe: DatePipe,
    private _numbersPipe: DecimalPipe) { }

  async asyncTranslate(name: string): Promise<string> {
    const transName = await this._translateService.get(name).toPromise();
    return transName as string;
  }

  syncTranslate(key: string) {
      return this._translateService.instant(key);
  }

  dateFormate(date: Date, formate?: string) {
    return this._datePipe.transform(date,
      formate ? formate : 'dd/MM/yyyy');
  }

  numberFormate(number: number, formate?: string) {
    return this._numbersPipe.transform(number,
      formate ? formate : '1.0-2');
  }
}
