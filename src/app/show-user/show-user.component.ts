import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements AfterViewInit {
  constructor(private router: Router, private toaster: ToastrService, private userService: UserService) { }

  users: Array<User> = [];
  originalUsers: Array<User> = []
  searchText: string;
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

        this.originalUsers.push(...this.users);
        this.isLoaded = true;
        console.log(this.users);
      }, (error) => {
        this.isLoaded = true;
        this.toaster.error("Failed. Please try again later.")
      });
  }

  deleteUser(symbolNumber: number) {
    this.isLoaded = false;

    if (symbolNumber) {
      this.userService.deleteUser(symbolNumber)
        .subscribe((isSuccess: boolean) => {
          console.log(`Delete: ${isSuccess}`);

          if (isSuccess) {
            this.toaster.success("Deleted Successfully");
            this.users.forEach((user, index) => {
              if (user.symbolNumber === symbolNumber)
                this.users.splice(index, 1);
            });
          }
          else
            this.toaster.warning("Student Not found");
          this.isLoaded = true;
        },
          (error) => {
            this.toaster.error("Failed. Please Try again later.");
            this.isLoaded = true;
          });
    }
  }

  searchUser() {
    if (!environment.production) {
      console.log("search student clicked")
    }

    if (this.searchText) {
      let search = this.searchText.toLocaleLowerCase();

      this.users = this.originalUsers.filter((user, index) => user.symbolNumber.toString().includes(search)
        || user.fullName.toLocaleLowerCase().includes(search) || user.email.toLocaleLowerCase().includes(search)
        || user.phoneNo.toString().includes(search))
    }
    else {
      this.users = [];
      this.users.push(...this.originalUsers);
    }
  }
}
