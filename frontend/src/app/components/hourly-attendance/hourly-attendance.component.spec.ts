import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyAttendanceComponent } from './hourly-attendance.component';

describe('HourlyAttendanceComponent', () => {
  let component: HourlyAttendanceComponent;
  let fixture: ComponentFixture<HourlyAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
