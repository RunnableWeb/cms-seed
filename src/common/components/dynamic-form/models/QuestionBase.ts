import { FormControlType } from "./enums";
import { QuestionOptionsBase } from "./QuestionOptionsBase";

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  requiredMessage: string;
  order: number;
  controlType: FormControlType;

  constructor(options: QuestionOptionsBase<T> = {}) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.requiredMessage = options.requiredMessage || "";
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || FormControlType.Textbox;
  }
}
