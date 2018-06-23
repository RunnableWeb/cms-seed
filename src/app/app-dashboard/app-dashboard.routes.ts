import { Routes } from "@angular/router";
import {  ShopsListComponent } from "./../shops/shops-list/shops-list.component";

export const appDashboardRotues: Routes = [
    { path: '', redirectTo: 'shopsList', pathMatch: 'full'},
    { path: 'shopsList', component: ShopsListComponent},
];