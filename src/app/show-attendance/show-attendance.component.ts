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

  deleteAttendance(symbolNumber: number) {
    this.isLoaded = false;
    
    if (symbolNumber) {
      this.attendanceService.deleteAttendance(symbolNumber)
        .subscribe((isSuccess: boolean) => {
          console.log(`Delete: ${isSuccess}`);

          if (isSuccess) {
            this.toastr.success("Deleted Successfully");
            this.attendanceList.forEach((attendace, index) => {
              if (attendace.symbolNumber === symbolNumber)
                this.attendanceList.splice(index, 1);
            });
          }
          else
            this.toastr.warning("Attendance Not found");
          this.isLoaded = true;
        },
          (error) => {
            this.toastr.error("Failed. Please Try again later.");
            this.isLoaded = true;
          });
    }
  }
}
