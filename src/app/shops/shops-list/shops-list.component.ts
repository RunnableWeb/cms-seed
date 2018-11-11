import { Component, OnInit } from "@angular/core";
import { QuestionBase, TextboxQuestion, DropdownQuestion, DropdownQuestionOption } from "src/rw-ng-ggl-material/components";
import { DashboardService } from "../../app-dashboard/dashboard.service";


@Component({
  selector: "app-shops-list",
  templateUrl: "./shops-list.component.html",
  styleUrls: ["./shops-list.component.css"]
})
export class ShopsListComponent implements OnInit {
  public columnDefs: any[] = [];
  public rowData: any[] = [];
  public edFormQuestions: QuestionBase<any>[];
  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    setTimeout(() => {
      this._dashboardService.showLoader();
    }, 0);
    setTimeout(() => {
      this._dashboardService.hideLoader();
      this.columnDefs = [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" },
        {
          headerName: "ACTIONS",
          headerTooltip: "ACTIONS",
          field: "actions",
          cellRenderer: "actionsComponent"
        }
      ];

      this.rowData = [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
      ];
    }, 500);
    this.edFormQuestions = [

      new TextboxQuestion({
        key: 'make',
        label: 'Make',
        order: 1,
        required: true,
        requiredMessage: "Make is required",
        type: 'text',
        value: ''
      }),
      new DropdownQuestion({
        key: "model",
        label: "Model",
        order: 2,
        required: true,
        requiredMessage: "Model is required",
        options: <DropdownQuestionOption[]>[{ text: "Celica", value: 'Celica' }, { text: "Mondeo", value: 'Mondeo' }, { text: "Boxter", value: 'Boxter' }]
      }),
      new TextboxQuestion({
        key: 'price',
        label: 'Price',
        order: 3,
        required: true,
        requiredMessage: "Price is required",
        type: 'number',
        value: ''
      }),
    ]
  }


  async edOnSubmit({ formData, entityId }) {
    console.log("formData: " + formData);
    console.log("entityId: " + entityId);
  }


  edOnEntityDelete(entity): void {
    console.log(entity);
  }
}
