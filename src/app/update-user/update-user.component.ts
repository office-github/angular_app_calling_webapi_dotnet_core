import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements AfterViewInit {
  isLoaded: boolean = true;
  isModified: boolean;
  user: User;
  oldUser: User;

  constructor(private activatedRoute: ActivatedRoute, private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {
    let symbolNumber = +this.activatedRoute.snapshot.paramMap.get('symbolNumber');

    console.log("Symbol No: " + symbolNumber);

    if (symbolNumber) {
      this.userService.getUser(symbolNumber)
        .subscribe((user: User) => {
          this.user = {
            symbolNumber: user['symbolNumber'],
            fullName: user["fullName"],
            email: user['email'],
            phoneNo: user["phoneNo"]
          }

          this.oldUser = {
            symbolNumber: user['symbolNumber'],
            fullName: user["fullName"],
            email: user['email'],
            phoneNo: user["phoneNo"]
          };
          console.log(this.user);
          if (this.user && this.user.symbolNumber > 0) {
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

  updateUser() {
    console.log("update studnet clicked")
    console.log(this.oldUser);
    this.isLoaded = false;

    if (this.isUpdated()) {
      this.userService.updateUser(this.user)
        .subscribe((isSuccess: boolean) => {
          console.log(`Update Student: ${isSuccess}`);

          if (isSuccess) {
            this.toaster.success("Student Updated Successfully");
          }
          else {
            this.toaster.warning("Update Failed. Please try again later.");
          }

          this.isLoaded = true;
        },
          (error) => {
            this.toaster.error("Error Occured. Please try again later.");
            this.isLoaded = true;
          });
    }
  }

  isUpdated(): boolean {
    if (this.user.symbolNumber == this.oldUser.symbolNumber) {
      if (this.user.fullName != this.oldUser.fullName || this.user.email != this.oldUser.email
         || (this.user.phoneNo != this.oldUser.phoneNo && this.user.phoneNo > 9111111111
         && this.user.phoneNo < 9900000000)) {
        this.isModified = true;
      }
      else {
        this.isModified = false;
      }
    }

    return this.isModified;
  }
}
