import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ShowAttendanceComponent } from './show-attendance/show-attendance.component';
import { SearchAttendanceComponent } from './search-attendance/search-attendance.component';
import { ErrorComponent } from './error/error.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';


const routes: Routes = [
  { path: 'show-user', component: ShowUserComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'search-user', component: SearchUserComponent },
  { path: 'delete-user', component: DeleteUserComponent },
  { path: 'update/:symbolNumber', component: UpdateUserComponent },
  { path: 'show-attendance', component: ShowAttendanceComponent },
  { path: 'search-attendance', component: SearchAttendanceComponent },
  { path: '', redirectTo: '/show-attendance', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
