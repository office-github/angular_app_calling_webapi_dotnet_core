import { Component, AfterViewInit } from '@angular/core';
import { AttendaceService } from '../services/attendace.service';
import { Attendance } from '../models/attendance';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.css']
})
export class ShowAttendanceComponent implements AfterViewInit {
  constructor(private attendanceService: AttendaceService) { }

  attendanceList: Array<Attendance> = [];

  ngAfterViewInit(): void {
    console.log("show attendance clicked")
    this.attendanceService.getAttendance()
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
