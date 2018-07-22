import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _loaderIsShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  get loaderIsShown$(): Observable<boolean> {
    return this._loaderIsShown$;
  }
  showLoader() {
    this._loaderIsShown$.next(true);
  }
  hideLoader() {
    setTimeout(() => {      
      this._loaderIsShown$.next(false);
    }, 500);
  }

}
