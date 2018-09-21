import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-entity-list-filter',
  templateUrl: './entity-list-filter.component.html',
  styleUrls: ['./entity-list-filter.component.scss']
})
export class EntityListFilterComponent implements OnInit {
  public pickedEntity = null;

  @Input() entitiesList = []
  @Output() onChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  constructor() { }

  ngOnInit() {
  }

  onEntityChange($event) {
    this.onChange.next($event.value);
  }

  clearEntity() {
    this.pickedEntity = null;
    this.onChange.next(null);
  }

}
