import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";

@Component({
  selector: "hourly-attendance-form",
  templateUrl: "./hourly-attendance-form.component.html",
  styleUrls: ["./hourly-attendance-form.component.scss"],
})
export class HourlyAttendanceFormComponent implements OnInit {
  hourlyForm: FormGroup;
  students = [
    { id: 1, name: "Ramanan KB", rollNo: "211420104218" },
    { id: 2, name: "Bharathi S", rollNo: "211420104219" },
    { id: 3, name: "Suresh H", rollNo: "211420104220" },
    { id: 4, name: "Priyadharshan", rollNo: "211420104221" },
    { id: 5, name: "Sanjeev V", rollNo: "211420104222" },
  ];

  constructor(private fb: FormBuilder, private data: DataService) {}
  ngOnInit(): void {
    this.hourlyForm = this.fb.group({
      id: null,
      department: [{ Value: "CSE", disabled: true }, [Validators.required]],
      section: ["C", [Validators.required]],
      student: [null, [Validators.required]],
      date: [{ value: new Date(), disabled: true }, [Validators.required]],
      period: [],
      absent: [true, [Validators.required]],
    });
  }
  submit() {
    console.log(this.hourlyForm.value);
  }
}
