import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

import { AttendaceService } from '../services/attendace.service';
import { Attendance } from '../models/attendance';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.css']
})
export class ShowAttendanceComponent implements AfterViewInit {
  constructor(private toastr: ToastrService, private attendanceService: AttendaceService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  attendanceList: Array<Attendance> = [];
  displayedColumns: string[] = ['Symbol Number', 'Attendance Date', 'Is Present'];
  dataSource;
  isLoaded: boolean;

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;

    console.log("show attendance clicked")
    this.attendanceService.getAttendance()
      .subscribe((attendanceList: Attendance[]) => {
        attendanceList.forEach(attendance => {
          this.attendanceList.push({
            symbolNumber: attendance['symbolNumber'],
            attendanceDate: attendance["attendanceDate"],
            isPresent: attendance['isPresent']
          })
          //this.dataSource = new MatTableDataSource<Attendance>(this.attendanceList);
        });

        this.isLoaded = true;
        this.toastr.success('Successfull');
        console.log(this.attendanceList);
      },
        (error) => {
          this.toastr.error("Error occured. Please try again later.");
          this.isLoaded = true;
        });
  }
}
