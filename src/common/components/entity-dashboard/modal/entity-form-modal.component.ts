import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-entity-form-modal',
    templateUrl: './entity-form-modal.component.html',
    styleUrls: ['./entity-form-modal.component.scss']
})
export class EntityFormModalComponent implements OnInit {
    constructor(   
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EntityFormModalComponent>
    ) { }
    
    ngOnInit(): void { }

    onFormSubmit(form) {
        if(form.valid) {
             this.closeDialog(form.value);
        }
    }

    closeDialog(data?) {
        this.dialogRef.close(data);
    }
}
