import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AgGridModule } from "ag-grid-angular";

import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

import { appRoutes } from "./app.routes";

import { ShopsListComponent } from "./shops/shops-list/shops-list.component";
import { LoginComponent } from "./users/login/login.component";
import { AppDashboardComponent } from "./app-dashboard/app-dashboard.component";

import { BasicAuthGuard } from "./_guards/basic.auth.guard";

import { CurrentUserService } from "./services/current-user.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AppDashboardComponent,
    ShopsListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    AgGridModule.withComponents([]),

    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule
  ],
  providers: [BasicAuthGuard, CurrentUserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
