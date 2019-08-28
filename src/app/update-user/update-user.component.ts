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
  isUpdated: boolean;
  isLoaded: boolean = true;
  //symbolNumber: number;
  user: User;

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
    this.isLoaded = false;

    this.userService.updateUser(this.user)
      .subscribe((isSuccess: boolean) => {
        this.isUpdated = isSuccess;
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
