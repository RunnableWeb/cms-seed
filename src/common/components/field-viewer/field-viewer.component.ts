import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-viewer',
  templateUrl: './field-viewer.component.html',
  styleUrls: ['./field-viewer.component.scss']
})
export class AppFieldViewerComponent implements OnInit {

  @Input() label: string='';
  @Input() value: string='';

  constructor() { }

  ngOnInit() {
  }

}
