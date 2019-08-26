import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  isAdded: boolean;

  ngAfterViewInit(): void {
    console.log("Add studnet clicked")
    this.userService.addUser(new User())
      .subscribe((isSuccess: boolean) => {
        this.isAdded = isSuccess;
        console.log(`Add Student: ${isSuccess}`);
      });
  }
}
