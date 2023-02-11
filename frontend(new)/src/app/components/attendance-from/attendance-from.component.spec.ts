import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFromComponent } from './attendance-from.component';

describe('AttendanceFromComponent', () => {
  let component: AttendanceFromComponent;
  let fixture: ComponentFixture<AttendanceFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
