import { Component, AfterViewInit } from '@angular/core';
import { AttendaceService } from '../services/attendace.service';
import { Attendance } from '../models/attendance';

@Component({
  selector: 'app-search-attendance',
  templateUrl: './search-attendance.component.html',
  styleUrls: ['./search-attendance.component.css']
})
export class SearchAttendanceComponent implements AfterViewInit {
  constructor(private attendanceService: AttendaceService) { }

  attendanceList: Array<Attendance> = [];

  ngAfterViewInit(): void {
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
      });
  }
}
