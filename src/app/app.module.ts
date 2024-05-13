import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, HashLocationStrategy, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule, withHashLocation, ExtraOptions } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptorInterceptor } from './core/helpers/jwt-interceptor.interceptor';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { NavigationComponent } from './layouts/header/navigation.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SpinnerComponent } from './layouts/spinner.component';
const notifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent  ],
  
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // RouterModule.forRoot(Approutes, {useHash: true}),
    RouterModule.forRoot(Approutes),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    NotifierModule.withConfig(notifierOptions)
  ],
  //provide: LocationStrategy, useClass: HashLocationStrategy
  providers: [
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
