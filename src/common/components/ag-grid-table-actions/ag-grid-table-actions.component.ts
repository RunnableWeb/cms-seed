import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid";
import { IHasEntityDashboardComponent } from "../entity-dashboard";

@Component({
  selector: "app-ag-grid-table-actions",
  templateUrl: "./ag-grid-table-actions.component.html",
  styleUrls: ["./ag-grid-table-actions.component.scss"]
})
export class AgGridTableActionsComponent implements ICellRendererAngularComp {
 
  public entity: object
  public parentComp: IHasAgGridTableActionsComponent

  agInit(params: ICellRendererParams) {
    this.entity = params.data;
    this.parentComp = params.context.parentComp as IHasAgGridTableActionsComponent;
  }

  refresh(params: any): boolean {
    return true;
  }
}


export interface IHasAgGridTableActionsComponent {
  onEditEntity(entity: object);
  onDeleteEntity(entity: object);
}

