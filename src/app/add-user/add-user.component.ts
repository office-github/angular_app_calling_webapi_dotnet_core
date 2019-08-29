import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit {
  isAdded: boolean;
  isValidUserInformation: boolean;
  isTaken: boolean;
  isLoaded: boolean = true;

  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {

  }

  addUser(user: User) {
    this.isLoaded = false;
    console.log("Add studnet clicked")

    if (this.isValid(user)) {
      this.userService.addUser(user)
        .subscribe((isSuccess: boolean) => {
          this.isAdded = isSuccess;
          console.log(`Add Student: ${isSuccess}`);

          if (isSuccess) {
            this.toaster.success("Student Added Successfully");
          }
          else {
            this.toaster.warning("Add Failed Please try again later.");
          }

          this.isLoaded = true;
        },
          (error) => {
            this.toaster.error("Error Occured. Please try again later.");
            this.isLoaded = true;
          });
    }
    else {
      this.toaster.error("Please provide valid student information");
    }
  }

  isValid(user: User): boolean {
    if (user.symbolNumber > 0 && user.fullName != null && user.fullName.trim() != ''
      && user.email != null && user.email.trim() != ''
      && user.phoneNo > 7999999999 && user.phoneNo < 9999999999) {
      this.isValidUserInformation = true;
    }
    else {
      this.isValidUserInformation = false;
    }

    return this.isValidUserInformation;
  }

  isSymbolNumberTaken(user: User) {
    if(user && user.symbolNumber > 0) {
      this.userService.getUser(user.symbolNumber).subscribe((isSuccess) => {
        if(isSuccess) {
          this.isTaken = true;
        }
        else {
          this.isTaken = false;
        }
      })
    }
    else {
      this.isTaken = false;
    }
  }
}
