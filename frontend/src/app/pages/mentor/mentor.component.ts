import { FadeInOut } from "../../animations";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Mentor } from "src/app/models";

@Component({
  selector: "app-mentor",
  templateUrl: "./mentor.component.html",
  styleUrls: ["./mentor.component.scss"],
  animations: [FadeInOut],
})
export class MentorComponent implements OnInit {
  mentors: Mentor[];
  mentorId = -1;
  isLoading = false;

  pageSize = 10;
  pageIndex = 1;
  total: number;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getMentors();
  }

  getMentors() {
    this.isLoading = !this.isLoading;
    this.http.get<Mentor[]>(`http://localhost:3000/api/users`).subscribe(
      (res: Mentor[]) => {
        console.log(res);
        this.mentors = res;
        this.isLoading = !this.isLoading;
        this.total = res.length;
        // console.log(res);
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
