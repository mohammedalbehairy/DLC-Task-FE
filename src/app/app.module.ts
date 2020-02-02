import { AdminGuardService } from './shared/middlewares/admin-guard.service';
import { SummaryPipe } from './shared/pipes/summary.pipe';
import { SharedModule } from './shared/shared.module';
import { httpInterceptorProviders } from './shared/interceptors/index';
import { BasicModule } from './basic/basic.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileModule } from './profile/profile.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthGuardService } from './shared/middlewares/auth-guard.service';
import { AuthGuestService } from './shared/middlewares/auth-guest.service';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule,
    BasicModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center', //positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      enableHtml: true
    }),
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuardService,
    AuthGuestService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
