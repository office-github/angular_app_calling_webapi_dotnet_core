import { Component, AfterViewInit } from '@angular/core';
import { AttendaceService } from '../services/attendace.service';
import { Attendance } from '../models/attendance';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-attendance',
  templateUrl: './search-attendance.component.html',
  styleUrls: ['./search-attendance.component.css']
})
export class SearchAttendanceComponent implements AfterViewInit {
  constructor(private toaster: ToastrService, private attendanceService: AttendaceService) { }

  attendanceList: Array<Attendance> = [];
  symbolNumber: number;
  isLoaded: boolean = true;;

  ngAfterViewInit(): void {

  }

  searchAttendance() {
    console.log("search student clicked")
    this.isLoaded = false;

    if (this.symbolNumber) {
      console.log("show attendance clicked")
      this.attendanceService.searchAttendance(1)
        .subscribe((attendanceList: Attendance[]) => {
          attendanceList.forEach(attendance => {
            this.attendanceList.push({
              symbolNumber: attendance['symbolNumber'],
              attendanceDate: attendance["attendanceDate"],
              isPresent: attendance['isPresent']
            })
          });

          console.log(this.attendanceList);
          if (this.attendanceList) {
            this.toaster.success("Found", "Successfully")
          }
          else {
            this.toaster.warning("Student Not found");
          }

          this.isLoaded = true;
        },
          (errror) => {
            this.toaster.error("Error occured. Please Try again later.")
            this.isLoaded = true;
          });
    }
  }
}
