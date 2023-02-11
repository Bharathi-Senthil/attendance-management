export interface Attendance {
  id: string;
  student: Student;
  date: string;
  present: boolean;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  section: string;
  department: string;
}
