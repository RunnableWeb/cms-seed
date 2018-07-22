import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './services';
import { TranslateService } from '../../node_modules/@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private _translate: TranslateService,
    private _currentUserService: CurrentUserService) {
    // default to Hebrew
    _translate.setDefaultLang("iw");
    _translate.use("iw");
  }

  ngOnInit(): void {
    this._currentUserService.init();
  }
}
