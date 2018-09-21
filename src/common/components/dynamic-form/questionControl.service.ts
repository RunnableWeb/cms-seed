import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { QuestionBase } from "./models/QuestionBase";
import { DropdownQuestion, FormControlType } from "./models";

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      const frmCtrl = question.required
        ? new FormControl(question.value, Validators.required)
        : new FormControl(question.value);

      group[question.key] = frmCtrl;

      question.setFormControl(frmCtrl)

      switch (question.controlType) {
        case FormControlType.Dropdown:
          (question as DropdownQuestion).setFilterFormCtrl()
      }

    });


    return new FormGroup(group);
  }
}
