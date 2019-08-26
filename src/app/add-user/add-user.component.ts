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

  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {
    
  }

  addUser(user: User) {
    console.log("Add studnet clicked")
    this.userService.addUser(user)
      .subscribe((isSuccess: boolean) => {
        this.isAdded = isSuccess;
        console.log(`Add Student: ${isSuccess}`);

        if(isSuccess) {
          this.toaster.success("Student Added Successfully");
        }
        else {
          this.toaster.warning("Failed, Try again later.");
        }
      },
      (error) => {
        this.toaster.error("Error Occured");
      });
  }
}
