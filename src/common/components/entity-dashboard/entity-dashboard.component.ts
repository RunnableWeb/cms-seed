import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, SimpleChanges, OnChanges } from "@angular/core";
import { GridOptions, ColDef } from "ag-grid";
import { cloneDeep } from "lodash-es";
import { AgGridTableActionsComponent, IHasAgGridTableActionsComponent } from "../ag-grid-table-actions/ag-grid-table-actions.component";
import { QuestionBase } from "../dynamic-form/models";
import { MatDialog } from "@angular/material";
import { EntityFormModalComponent } from "./modal/entity-form-modal.component";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import device from 'current-device';

let edFormNameCounter = 0;

@Component({
  selector: "app-entity-dashboard",
  templateUrl: "./entity-dashboard.component.html",
  styleUrls: ["./entity-dashboard.component.scss"]
})
export class EntityDashboardComponent implements OnInit, OnChanges, AfterViewInit, IHasAgGridTableActionsComponent {
  @Input() entites: object[];

  @Input() columnDefs: ColDef[];
  public columnDefinitions: ColDef[];

  @Input() formQuestions: QuestionBase<any>[]
  private _formName: string

  @Input() newEditPageBaseUrl: string;

  @Input() frameworkComponents: object

  // btns texts FOR LATER USE
  @Input() btnTxtCreateNew;
  @Input() btnTxtEdit;
  @Input() btnTxtDelete;
  @Input() btnTxtMoreDetails;
  @Input() showActions: boolean = true;
  @Input() hideAddAction: boolean = false;
  @Input() suppressResponsiveness: boolean = false;

  @Output() onFormSubmit = new EventEmitter<IEntityDashboardSubmitResponse>()
  @Output() onEntityEdit = new EventEmitter<object>()
  @Output() onEntityDelete = new EventEmitter<object>()

  public gridOptions: GridOptions;
  private _gridApi;
  private _gridColumnApi;

  private _translations: object = {};

  constructor(
    private _matDialog: MatDialog,
    private _translateService: TranslateService,
    private _router: Router
  ) {
  }

  async ngOnInit() {
    this._translations = await this._translateService.get([
      'AG_GRID.MSG_NO_ROWS_TO_SHOW'
    ]).toPromise();

    this._formName = `edForm-${edFormNameCounter++}`;

    this.gridOptions = {
      enableRtl: true,
      onGridReady: this._onGridReady.bind(this),
      frameworkComponents: {
        actionsComponent: AgGridTableActionsComponent,
        ...this.frameworkComponents
      },
      context: {
        parentComp: this
      },
      localeText: {noRowsToShow: this._translations['AG_GRID.MSG_NO_ROWS_TO_SHOW']}
    };

    window.addEventListener('resize', () => {
      this._sizeColumnToFit();
    })
  } // -- ngOnInit

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columnDefs && changes.columnDefs.currentValue) {
      // columnDefs has been assinged a value - this should happen once. (and it may contain async/await operations, e.g. ngx translation)
      this.columnDefinitions = changes.columnDefs.currentValue;
      this._setActionComponentColumnSpecifics();
    }

    if (changes.entites && changes.entites.currentValue && changes.entites.currentValue.length) {
      this._sizeColumnToFit();
    }
  }

  ngAfterViewInit() {
    // this.gridOptions.api.sizeColumnsToFit();
    // this.gridOptions.api.sizeColumnsToFit();
    // window.setInterval(() =>{ 
    //   const gridApi = this._gridApi
    //   if(gridApi){ // sometimes its null somehow - inner grid issue
    //     gridApi.sizeColumnsToFit();
    //   }
    // }, 2000);
  }

  // called from AgGridTableActionsComponent
  onEditEntity(entity: { id: string }) {
    const { newEditPageBaseUrl } = this;
    if (newEditPageBaseUrl) {
      this._router.navigate([`${newEditPageBaseUrl}/${entity.id}`])
    } else {
      this.openDialog(entity);
    }

  }

  onAddEntity() {
    const { newEditPageBaseUrl } = this;
    if (newEditPageBaseUrl) {
      this._router.navigate([`${newEditPageBaseUrl}/new`])
    } else {
      this.openDialog();
    }
  }

  // called from AgGridTableActionsComponent
  async onDeleteEntity(entity: object) {
       this.onEntityDelete.emit(entity);
  }

  _onGridReady(params) {
    this._gridApi = params.api;
    this._gridColumnApi = params.columnApi;

    this._sizeColumnToFit();
  }

  private _setActionComponentColumnSpecifics() {
    this.columnDefinitions.forEach(colDef => {
      if (colDef.field === 'actions' &&
        colDef.cellRenderer === 'actionsComponent') {
        colDef.suppressSizeToFit = true;
        colDef.minWidth = 200;
      }
    });
  }

  async openDialog(entity?: { id: string }) {

    const tkTitle = !!entity ? 'EDIT' : 'ADD_NEW';

    let formQuestions = this.formQuestions;

    if (entity) {
      formQuestions = this._getPopulateFormQuestionsWithValues(entity);
    }

    const dialogRef = this._matDialog.open(EntityFormModalComponent, {
      width: "25%",
      data: {
        title: await this._translateService.get(tkTitle).toPromise(),
        formQuestions: formQuestions, // when passing again and agin pass new clone collection and pass new one so change detection work and form get updated from the colned colleciton
        formName: this._formName,
        editMode: !!entity,
      },
    });

    const sub = dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        this.onFormSubmit.emit({
          entityId: entity ? entity.id : null,
          formData
        });
      }

      sub.unsubscribe();
    });
  }

  private _getPopulateFormQuestionsWithValues(entity) {
    const formQuestionsClone = cloneDeep(this.formQuestions) as QuestionBase<any>[];

    formQuestionsClone.forEach(question => {
      question.value = entity[question.key];
    });

    return formQuestionsClone;
  }

  private _sizeColumnToFit() {
    if (device.mobile() || device.tablet() || this.suppressResponsiveness) {
      return;
    }
   
    if(this.gridOptions.api) {
      this.gridOptions.api.sizeColumnsToFit();
    }
  }
}


export interface IHasEntityDashboardComponent {
  edColumnDefs: ColDef[];
  edRowData: object[];
  edFormQuestions: QuestionBase<any>[];
  edFrameworkComponents?: object,
  edPrepareGridData(): void
  edPrepareFormQuestions(): void;
  edOnSubmit?(submitData: IEntityDashboardSubmitResponse): void;
  edOnEntityDelete(entity): void;
}

export interface IEntityDashboardSubmitResponse {
  formData: any,
  entityId: string,
}

export enum EntityDashboardAddEditIntent {
  Modal,
  NewPage
}
