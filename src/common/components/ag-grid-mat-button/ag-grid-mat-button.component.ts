import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid';

@Component({
    selector: 'app-ag-grid-mat-button',
    templateUrl: './ag-grid-mat-button.component.html',
    styleUrls: ['./ag-grid-mat-button.component.scss']
})
export class AgGridMatButtonComponent implements ICellRendererAngularComp {
    public entity:  object;
    public dataModel: AgGridMatButtonDataModel;
    public type = AgGridMatButtonComponentType;
    
    constructor() { } 

    agInit(params: ICellRendererParams) {
        this.entity = params.data;
        this.dataModel = <AgGridMatButtonDataModel>params.data[params.colDef.field];
    }

    onBtnClick($event) {
    }

    refresh(params: any): boolean {
        return true;
    }
}

export interface AgGridMatButtonDataModel {
    type: AgGridMatButtonComponentType,
    text: string,
    onClick?: () => void
    link?: string
}

export enum AgGridMatButtonComponentType {
    Button, 
    Link
}
