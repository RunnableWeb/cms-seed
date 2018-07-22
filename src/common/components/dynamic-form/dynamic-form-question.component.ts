import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { QuestionBase } from "./models/QuestionBase";
import { FormControlType } from "./models/enums";
import { DropdownQuestion } from "./models";

@Component({
  selector: "app-question",
  templateUrl: "./dynamic-form-question.component.html",
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  public controlTypes = FormControlType;
  public DropdownQuestion = DropdownQuestion;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  

}
