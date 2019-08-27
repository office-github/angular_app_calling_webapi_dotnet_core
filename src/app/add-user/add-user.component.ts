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
  isLoaded: boolean = true;

  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {

  }

  addUser(user: User) {
    this.isLoaded = false;

    console.log("Add studnet clicked")
    this.userService.addUser(user)
      .subscribe((isSuccess: boolean) => {
        this.isAdded = isSuccess;
        console.log(`Add Student: ${isSuccess}`);

        if (isSuccess) {
          this.toaster.success("Student Added Successfully");
        }
        else {
          this.toaster.warning("Add Failed. Please try again later.");
        }

        this.isLoaded = true;
      },
        (error) => {
          this.toaster.error("Error Occured. Please try again later.");
          this.isLoaded = true;
        });
  }
}
