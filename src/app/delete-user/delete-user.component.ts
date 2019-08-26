import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements AfterViewInit {
  isDeleted: boolean;
  symbolNumber: number;  
  
  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {

  }

  deleteUser() {
    console.log("delete studnet clicked")

    if (this.symbolNumber) {
      this.userService.deleteUser(this.symbolNumber)
        .subscribe((isSuccess: boolean) => {
          this.isDeleted = isSuccess;
          console.log(`Delete: ${isSuccess}`);

          if(this.isDeleted)
            this.toaster.success("Deleted Successfully");
          else 
            this.toaster.warning("Not found");
        },
        (error) => {
          this.toaster.error("Failed. Please Try again later.");
        });
    }
  }
}
