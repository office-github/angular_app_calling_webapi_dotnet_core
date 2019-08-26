import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material'
import { FormsModule } from '@angular/forms';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './services/user.service';
import { AttendaceService } from './services/attendace.service';
import { ShowUserComponent } from './show-user/show-user.component';
import { ShowAttendanceComponent } from './show-attendance/show-attendance.component';
import { SearchAttendanceComponent } from './search-attendance/search-attendance.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ShowUserComponent,
    ShowAttendanceComponent,
    SearchAttendanceComponent,
    SearchUserComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    MatProgressBarModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [UserService, AttendaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
