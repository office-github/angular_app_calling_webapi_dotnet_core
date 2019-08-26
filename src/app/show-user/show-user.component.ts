import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  users: Array<User> = [];

  ngAfterViewInit(): void {
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
}
