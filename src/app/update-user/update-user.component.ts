import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements AfterViewInit {
  isUpdated: boolean;
  isLoaded: boolean = true;

  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {
  }

  updateUser(user: User) {
    console.log("update studnet clicked")
    this.isLoaded = false;

    this.userService.updateUser(user)
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
