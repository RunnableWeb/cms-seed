import { QuestionBase } from "./QuestionBase";
import { FormControlType } from "./enums";
import { QuestionOptionsBase } from "./QuestionOptionsBase";

export class TextboxQuestion extends QuestionBase<string> {
  controlType = FormControlType.Textbox;
  type: string;

  constructor(options: TextboxQuestionOptions = {}) {
    super(options);
    this.type = options["type"] || "text";
  }
}

export class TextboxQuestionOptions extends QuestionOptionsBase<string> {
  type?: string;
}
