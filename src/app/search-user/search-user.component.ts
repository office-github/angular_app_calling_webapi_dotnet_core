import { Component, AfterViewInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements AfterViewInit {
  user: User;
  symbolNumber: number;
  isLoaded: boolean = true;

  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {

  }

  searchUser() {
    console.log("search student clicked")
    this.isLoaded = false;

    if (this.symbolNumber) {
      this.userService.getUser(this.symbolNumber)
        .subscribe((user: User) => {
          this.user = {
            symbolNumber: user['symbolNumber'],
            fullName: user["fullName"],
            email: user['email'],
            phoneNo: user["phoneNo"]
          }
          console.log(this.user);
          if (this.user) {
            this.toaster.success("Found Successfully")
          }
          else {
            this.toaster.warning("Student Not found");
          }

          this.isLoaded = true;
        },
          (errror) => {
            this.toaster.error("Error occured. Please try again later.")
            this.isLoaded = true;
          });
    }
  }
}
