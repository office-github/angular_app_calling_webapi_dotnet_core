import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAttendanceComponent } from './show-attendance.component';

describe('ShowAttendanceComponent', () => {
  let component: ShowAttendanceComponent;
  let fixture: ComponentFixture<ShowAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
