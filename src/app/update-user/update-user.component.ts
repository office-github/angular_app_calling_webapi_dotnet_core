import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  isUpdated: boolean;

  ngAfterViewInit(): void {
    console.log("update studnet clicked")
    this.userService.updateUser(new User())
      .subscribe((isSuccess: boolean) => {
        this.isUpdated = isSuccess;
        console.log(`Update: ${isSuccess}`);
      });
  }
}
