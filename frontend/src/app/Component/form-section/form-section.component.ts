import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent {
  // people = [
  //   {
  //     name: 'Ramanan',
  //     age: 19,
  //   },
  //   {
  //     name: 'Suresh',
  //     age: 20,
  //   },
  //   {
  //     name: 'Bharathi',
  //     age: 19,
  //   },
  // ];

  // personForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.personForm = fb.group({
  //     name: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(20),
  //       ],
  //     ],
  //     age: [0, [Validators.required, Validators.min(15)]],
  //     email: ['', [Validators.required, Validators.email]],
  //   });
  // }

  // addPerson() {
  //   if (this.personForm.valid) {
  //     this.people.push(this.personForm.value);
  //     this.personForm.reset();
  //   } else {
  //     Object.values(this.personForm.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  // deletePerson(id: number) {
  //   this.people.splice(id, 1);
  // }
  date = new Date();
  absentForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.absentForm = fb.group({
      Date: [this.date,
        Validators.required],
      
    })
  }
}
