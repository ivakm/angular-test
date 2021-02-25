import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { CookieModule } from "ngx-cookie";
import { AppRoutingModule } from "./app-routing.module";
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { MainComponent } from './components/main/main.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
    MainComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CookieModule.forRoot(),
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
