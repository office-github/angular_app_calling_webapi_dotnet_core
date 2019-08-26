import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements AfterViewInit {
  constructor(private userService: UserService) { }

  isDeleted: boolean;

  ngAfterViewInit(): void {
    console.log("delete studnet clicked")
    this.userService.delteUser(1)
      .subscribe((isSuccess: boolean) => {
        this.isDeleted = isSuccess;
        console.log(`Delete: ${isSuccess}`);
      });
  }
}
