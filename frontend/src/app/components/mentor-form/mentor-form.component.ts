import { FadeInOut } from "./../../animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-mentor-form",
  templateUrl: "./mentor-form.component.html",
  styleUrls: ["./mentor-form.component.scss"],
})
export class MentorFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      pwd: [
        "",
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(8),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log("Mentor");
  }
}
