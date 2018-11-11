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
  MatProgressSpinnerModule,
  MatBadgeModule
} from "@angular/material";

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";

import { ShopsListComponent } from "./shops/shops-list/shops-list.component";
import { LoginComponent } from "./users/login/login.component";
import { AppDashboardComponent } from "./app-dashboard/app-dashboard.component";
import { DashboardDefaultSelectorComponent } from "./app-dashboard/dashboard-default-selector/dashboard-default-selector.component";

import { RWNgCommonModule } from "src/rw-ng-common/RWNgCommon.module";
import { RWNgGglMaterialModule } from "src/rw-ng-ggl-material/RWNgGglMaterial.module";
import { setAppInjector } from "src/rw-ng-common/misc";


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

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    RWNgCommonModule,
    RWNgGglMaterialModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    FlexLayoutModule,
    
    HttpClientModule,
    
    ToastrModule.forRoot(),
    
    NgxMatSelectSearchModule,

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
    MatDialogModule,
    MatBadgeModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
