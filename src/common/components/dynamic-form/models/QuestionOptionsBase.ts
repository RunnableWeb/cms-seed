import { FormControlType } from "./enums";

export class QuestionOptionsBase<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  requiredMessage?: string;
  order?: number;
  controlType?: FormControlType;
}
