import { FormControlType } from "./enums";
import { QuestionOptionsBase } from "./QuestionOptionsBase";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  requiredMessage: string;
  order: number;
  controlType: FormControlType;
  formControl: FormControl;
  setInitValueHandler?: (value) => any;  
  
  protected onDestroy$ = new Subject<void>();

  public setFormControl(value: FormControl) {
    this.formControl = value;
  }

  constructor(options: QuestionOptionsBase<T> = {}) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.requiredMessage = options.requiredMessage || "";
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || FormControlType.Textbox;
    this.setInitValueHandler = options.setInitValueHandler;
  }

  ngAfterViewInit() {
    if(this.setInitValueHandler) {
      this._setupInitValue();
   }
  }
  
  _setupInitValue() {
    const { formControl, setInitValueHandler } = this;
    if (setInitValueHandler) {
        const newValue = setInitValueHandler(formControl.value);
        formControl.setValue(newValue);
    }
  }

  onDestroy() {
      this.onDestroy$.next();
      this.onDestroy$.complete()
  }
}
