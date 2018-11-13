import { Routes } from "@angular/router";
import { ShopsListComponent } from "./../shops/shops-list/shops-list.component";
import { DashboardDefaultSelectorComponent } from "./dashboard-default-selector/dashboard-default-selector.component";

export const appDashboardRotues: Routes = [
    { path: '', redirectTo: 'defaultSelector', pathMatch: 'full' },
    {
        path: "defaultSelector",
        component: DashboardDefaultSelectorComponent,
        data: {
            title: "LOADING"
        }
    },
    {
        path: 'shopsList',
        component: ShopsListComponent,
        data: {
            title: "SHOPS"
        }
    },
    {
        path: 'shopsList1',
        component: ShopsListComponent,
        data: {
            title: "Link 2"
        }
    },
    {
        path: 'shopsList2',
        component: ShopsListComponent,
        data: {
            title: "Link 3"
        }
    }
];