import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { QuestionBase } from "./models/QuestionBase";
import { FormGroup } from "@angular/forms";
import { QuestionControlService } from "./QuestionControl.service";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"]
})
export class AppDynamicFormComponent implements OnInit, AfterViewInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() name: string
  @Input() parentSubmit: boolean

  @Output() onSubmit = new EventEmitter<object>()

  form: FormGroup;

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  ngAfterViewInit(): void {
     const { questions } = this;
     if(questions) {
       questions.forEach(question => question.ngAfterViewInit());
     }
  }

  submit() {
    this.onSubmit.emit(this.form);
  }
}
