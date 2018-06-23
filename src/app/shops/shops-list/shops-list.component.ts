import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shops-list",
  templateUrl: "./shops-list.component.html",
  styleUrls: ["./shops-list.component.css"]
})
export class ShopsListComponent implements OnInit {
  constructor() {}

  columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  ngOnInit() {}
}
