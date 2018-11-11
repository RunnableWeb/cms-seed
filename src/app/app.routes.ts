import { Routes } from "@angular/router";
import { ShopsListComponent } from "./shops/shops-list/shops-list.component";

import { AppDashboardComponent } from "./app-dashboard/app-dashboard.component";
import { appDashboardRotues } from "./app-dashboard/app-dashboard.routes";
import { LoginComponent } from "./users/login/login.component";
import { BasicAuthGuard } from "src/rw-ng-common/guards";

export const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: AppDashboardComponent,
    children: appDashboardRotues,
    canActivate: [BasicAuthGuard]
  },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", component: AppDashboardComponent }
];
