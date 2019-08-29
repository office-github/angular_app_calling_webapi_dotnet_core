import { Component, AfterViewInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements AfterViewInit {
  user: User = null;
  symbolNumber: number;
  isLoaded: boolean = true;

  constructor(private toaster: ToastrService, private userService: UserService) { }

  ngAfterViewInit(): void {

  }

  searchUser() {
    if (!environment.production) {
      console.log("search student clicked")
    }

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

          if (!environment.production) {
            console.log(this.user);
          }
          if (this.user && this.user.symbolNumber > 0)
            this.toaster.success("Student Found")
          else
            this.toaster.error("Student not found")
            
          this.isLoaded = true;
        },
          (errror) => {
            this.toaster.error("Error occured. Please try again later.")
            this.isLoaded = true;
          });
    }
    else {
      this.user = null;
      this.isLoaded = true;
    }
  }
}
