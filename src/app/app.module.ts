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
  MatInputModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

import { appRoutes } from "./app.routes";

import { ShopsListComponent } from "./shops/shops-list/shops-list.component";
import { LoginComponent } from "./users/login/login.component";
import { AppDashboardComponent } from "./app-dashboard/app-dashboard.component";

import { BasicAuthGuard } from "./_guards/basic.auth.guard";

import { CurrentUserService } from "./services/current-user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "./services/users.service";
import { ToasterService } from "./services/toaster.service";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { ToastrModule } from "../../node_modules/ngx-toastr";

import {
  AccessTokenHeaderInterceptor,
  UnAuthenticatedInterceptor
} from "./http-interceptors";
import { DashboardDefaultSelectorComponent } from "./app-dashboard/dashboard-default-selector/dashboard-default-selector.component";
import { AgGridTableActionsComponent, AgGridMatButtonComponent, EntityDashboardComponent, EntityFormModalComponent } from "../common/components";
import { AppDynamicFormComponent, DynamicFormQuestionComponent } from "../common/components/dynamic-form";
import { TranslateModule, TranslateLoader } from "../../node_modules/@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { QuestionControlService } from "../common/components/dynamic-form/QuestionControl.service";
import { UtilsService } from "./services/utils.service";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    AppDashboardComponent,
    DashboardDefaultSelectorComponent,
    ShopsListComponent,
    LoginComponent,
    //Entity Dashboard Componenet (they should be moved to 3rd party Module)
    AgGridTableActionsComponent,
    AgGridMatButtonComponent,
    EntityDashboardComponent,
    AppDynamicFormComponent,
    DynamicFormQuestionComponent,
    EntityFormModalComponent
    //----------------------
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FlexLayoutModule,
    AgGridModule.withComponents([
      AgGridTableActionsComponent,
      AgGridMatButtonComponent
    ]),
    HttpClientModule,
    ToastrModule.forRoot(),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    QuestionControlService,
    BasicAuthGuard,
    CurrentUserService,
    ToasterService,
    UsersService,
    UtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnAuthenticatedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [EntityFormModalComponent]
})
export class AppModule { }
