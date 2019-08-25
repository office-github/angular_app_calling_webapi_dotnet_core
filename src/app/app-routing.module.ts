import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AttendaceService } from './services/attendace.service';


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'attendance', component: AttendaceService },
  { path: 'attendance', component: AttendaceService },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
