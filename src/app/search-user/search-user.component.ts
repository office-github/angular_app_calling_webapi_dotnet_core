import { Component, AfterViewInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  user: User;

  ngAfterViewInit(): void {
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
}
