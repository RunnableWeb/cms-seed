import { Injectable } from '@angular/core';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private _translateService: TranslateService) { }

  async _asyncTranslate(name: string): Promise<string> {
    const transName = await this._translateService.get(name).toPromise();
    return transName as string;
  }
}
