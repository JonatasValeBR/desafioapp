import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';





@NgModule({
  imports: [
    IonicModule.forRoot()
  ],
  exports: [
    BrowserModule,
    IonicModule,
    HttpClientModule,
    HttpClient
  ],
  providers: [
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class CoreModule { }
