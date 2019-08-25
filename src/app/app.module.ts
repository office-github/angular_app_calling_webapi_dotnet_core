import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AttendaceComponent } from './attendace/attendace.component';
import { UserService } from './services/user.service';
import { AttendaceService } from './services/attendace.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AttendaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UserService, AttendaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
