import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements AfterViewInit {
  constructor(private toaster: ToastrService, private userService: UserService) { }

  users: Array<User> = [];
  isLoaded: boolean;

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

        this.isLoaded = true;
        console.log(this.users);
      }, (error) => {
        this.isLoaded = true;
        this.toaster.error("Failed. Please try again later.")
      });
  }
}
