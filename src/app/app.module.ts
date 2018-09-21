import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { DatePipe, DecimalPipe } from "@angular/common";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AgGridModule } from "ag-grid-angular";

import { ToastrModule } from "ngx-toastr";

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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";

import {  
  AgGridTableActionsComponent,
  AgGridMatButtonComponent,
  EntityDashboardComponent,
  EntityFormModalComponent,
  AppDynamicFormComponent,
  DynamicFormQuestionComponent,
  AppFieldViewerComponent
} from "./../common/components";

import { ShopsListComponent } from "./shops/shops-list/shops-list.component";
import { LoginComponent } from "./users/login/login.component";
import { AppDashboardComponent } from "./app-dashboard/app-dashboard.component";
import { DashboardDefaultSelectorComponent } from "./app-dashboard/dashboard-default-selector/dashboard-default-selector.component";

import { BasicAuthGuard } from "./_guards/basic.auth.guard";

import { 
  CurrentUserService,
  UsersService,
  ToasterService,
  UtilsService,
  LogService
 } from './services';

 import { QuestionControlService } from "../common/components/dynamic-form/QuestionControl.service";

import {
  AccessTokenHeaderInterceptor,
  UnAuthenticatedInterceptor
} from "./http-interceptors";

import { setAppInjector } from "./app-injector";

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
    AppFieldViewerComponent,
    
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
    DatePipe,
    LogService,
    DecimalPipe,
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
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
