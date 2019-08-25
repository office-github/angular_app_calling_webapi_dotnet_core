import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Attendance System';
  users: Array<User> = [];
  user: User = new User();

  constructor(private userService: UserService) { }

  addStudent() {
    console.log("add student cliked")
    this.userService.addUser(new User())
      .subscribe((isSuccess: boolean) => {
        console.log(`Add: ${isSuccess}`);
      });
  }

  deleteStudent() {
    console.log("delete studnet clicked")
    this.userService.delteUser(1)
      .subscribe((isSuccess: boolean) => {
        console.log(`Delete: ${isSuccess}`);
      });
  }

  updateStudent() {
    console.log("update studnet clicked")
    this.userService.updateUser(new User())
      .subscribe((isSuccess: boolean) => {
        console.log(`Update: ${isSuccess}`);
      });
  }

  showStudents() {
    console.log("show studnets clicked")
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        users.forEach(user => {
          this.users.push({
            symbolNumber: user['symbolNumber'],
            fullName: user["fullName"],
            email: user['email'],
            phoneNo: user["phoneNo"]
          })
        });

        console.log(this.users);
      });
  }

  searchStudent() {
    console.log("search student clicked")
    this.userService.getUser(1)
      .subscribe((user: User) => {
        this.user = {
          symbolNumber: user['symbolNumber'],
          fullName: user["fullName"],
          email: user['email'],
          phoneNo: user["phoneNo"]
        }
        console.log(this.user);
      });
  }

  showAttendance() {
    console.log("Show Attendance")
  }
}
