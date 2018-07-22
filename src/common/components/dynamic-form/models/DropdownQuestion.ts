import { QuestionBase } from './QuestionBase';
import { FormControlType } from './enums';
import { QuestionOptionsBase } from './QuestionOptionsBase';

export interface DropdownQuestionOption { text: string, value: string | boolean | object }

export class DropdownQuestion extends QuestionBase<string | boolean | object>  {
  controlType = FormControlType.Dropdown;
  options: DropdownQuestionOption[] = [];
  isMultiple: boolean = false;

  constructor(ctrlOptions: DropdownCtrlOptions = { options: [] }) {
    super(ctrlOptions);
    this.options = ctrlOptions['options'] || [];
    this.isMultiple = ctrlOptions.isMultiple || false;
  }

  static matSelectCompare(opt1Val: { id: string }, opt2Val: { id: string }): boolean {
    // compare objects by id property - not by obj ref equality 
    if (typeof opt1Val === 'object' && typeof opt2Val === 'object') {
      return opt1Val && opt2Val && opt1Val.id === opt2Val.id;
    }

    // non-objects compare
    return opt1Val === opt2Val;
  }
}

// use with ngValue on option, not value
export class DropdownCtrlOptions extends QuestionOptionsBase<boolean | string | object> {
  options: DropdownQuestionOption[] = [];
  isMultiple?: boolean = false;
}