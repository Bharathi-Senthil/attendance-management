import { FadeInOut } from "./../../animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mentor",
  templateUrl: "./mentor.component.html",
  styleUrls: ["./mentor.component.scss"],
  animations: [FadeInOut],
})
export class MentorComponent implements OnInit {
  mentors: any[];
  mentorId = -1;
  isLoading = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMentors();
  }

  getMentors() {
    this.isLoading = !this.isLoading;
    this.http.get("http://localhost:3000/api/users").subscribe(
      (users: any) => {
        this.mentors = users;
        this.isLoading = !this.isLoading;
      },
      (err) => (this.isLoading = !this.isLoading)
    );
  }

  deleteMentor(id: number) {
    this.http
      .delete(`http://localhost:3000/api/users/${id}`)
      .subscribe((data: any) => this.getMentors());
  }
}
