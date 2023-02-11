import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/helpers/data.service";

@Component({
  selector: "app-attendance-form",
  templateUrl: "./attendance-form.component.html",
  styleUrls: ["./attendance-form.component.scss"],
})
export class AttendanceFormComponent implements OnInit {
  form: FormGroup;
  students = [
    { id: 1, name: "Ramanan KB", rollNo: "211420104218" },
    { id: 2, name: "Bharathi S", rollNo: "211420104219" },
    { id: 3, name: "Suresh H", rollNo: "211420104220" },
    { id: 4, name: "Priyadharshan", rollNo: "211420104221" },
    { id: 5, name: "Sanjeev V", rollNo: "211420104222" },
  ];
  constructor(private fb: FormBuilder, private data: DataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      department: [{ value: "CSE", disabled: true }, [Validators.required]],
      section: ["C", [Validators.required]],
      student: [null, [Validators.required]],
      date: [{ value: new Date(), disabled: true }, [Validators.required]],
      absent: [true, [Validators.required]],
    });
    this.data
      .getDate()
      .subscribe((date) => this.form.controls["date"].setValue(date));
  }

  submit() {
    console.log(this.form.value);
  }
}
