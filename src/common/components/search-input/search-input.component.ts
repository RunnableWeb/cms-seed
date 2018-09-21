import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {


  @Input() disabled = false;
  @Input() labelTKey;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output('onClearSearch') onClearSearchCallback: EventEmitter<void> = new EventEmitter<void>();

  @Input() label = '';

  constructor(
    private _translateSvc: TranslateService
  ) { }

  async ngOnInit() {
    if (!this.label)
      this.label = await this._translateSvc.get(this.labelTKey || 'SEARCH').toPromise();
  }

  onSearchSubmit(term) {
    if (!term) {
      this.onClearSearch();
      return;
    }

    this.onSearch.emit(term);
  }

  onClearSearch() {
    this.onClearSearchCallback.emit();
  }

  checkIfClear(value) {
    console.log(value);

    if (!value) {
      this.onClearSearch();
    }
  }
}
