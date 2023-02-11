import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-attendance-from',
  templateUrl: './attendance-from.component.html',
  styleUrls: ['./attendance-from.component.scss']
})
export class AttendanceFromComponent {
date = new Date();
  absentForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.absentForm = fb.group({
      Date: [this.date,
        Validators.required],
      
    })
  }
}
