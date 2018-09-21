import { QuestionBase } from './QuestionBase';
import { FormControlType } from './enums';
import { QuestionOptionsBase } from './QuestionOptionsBase';
import { MatSelectChange } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface DropdownQuestionOption { text: string, value: string | boolean | object }

export class DropdownQuestion extends QuestionBase<string | boolean | object>  {
  controlType = FormControlType.Dropdown;
  options: DropdownQuestionOption[] = [];
  private allOptions: DropdownQuestionOption[];
  isMultiple: boolean = false;
  filterFormControl: FormControl

  onDropDownSelectChange;

  constructor(ctrlOptions: DropdownCtrlOptions = { options: [] }) {
    super(ctrlOptions);
    this.allOptions = this.options = ctrlOptions['options'] || [];
    this.isMultiple = ctrlOptions.isMultiple || false;
    this.onDropDownSelectChange = ctrlOptions.onSelectChange;
  }

  static matSelectCompare(opt1Val: { id: string }, opt2Val: { id: string }): boolean {
    // compare objects by id property - not by obj ref equality 
    if (typeof opt1Val === 'object' && typeof opt2Val === 'object') {
      return opt1Val && opt2Val && opt1Val.id === opt2Val.id;
    }

    // non-objects compare
    return opt1Val === opt2Val;
  }

  setFilterFormCtrl() {
      const ctrl = this.filterFormControl = new FormControl();
      ctrl.valueChanges
           .pipe(takeUntil(this.onDestroy$))
           .subscribe(value => {
              this._filter(value);
           });
  }
  
  onSelectChange($event: MatSelectChange, form: FormGroup) {
    if (this.onDropDownSelectChange) {
      this.onDropDownSelectChange($event, form);
    }
  }

  _filter(value) {
    if(!value) {
      this.options = this.allOptions;
    };
    this.options = this.allOptions.filter(option => option.text.includes(value))
  }
}


// use with ngValue on option, not value
export class DropdownCtrlOptions extends QuestionOptionsBase<boolean | string | object> {
  options: DropdownQuestionOption[] = [];
  isMultiple?: boolean = false;
  onSelectChange?: ($event: MatSelectChange, from: FormGroup) => void
}