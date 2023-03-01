import { NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Student } from 'src/app/models';
  

interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<Student> | null;
    listOfFilter: NzTableFilterList;
  }

export const listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn:null,
      listOfFilter: [],
    },
    {
      name: 'Roll No',
      sortOrder: null,
      sortFn:null,
      listOfFilter: [],
    },
    {
      name: 'Reg No',
      sortOrder: null,
      sortFn:null,
      listOfFilter: [],
    },
    {
      name: 'Year',
      sortFn: null,
      sortOrder: null,
      listOfFilter: [
        { text: 'I', value: 1 },
        { text: 'II', value: 2 },
        { text: 'III', value: 3 },
        { text: 'IV', value: 4 }
      ],
    },
    {
      name: 'Section',
      sortFn: null,
      sortOrder: null,
      listOfFilter: [
        { text: 'A', value: 1 },
        { text: 'B', value: 2 },
        { text: 'C', value: 3 },
        { text: 'D', value: 4 },
        { text: 'E', value: 5 }
      ],
    },
    {
      name: 'Mentor',
      sortOrder: null,
      sortFn:null,
      listOfFilter: [],
    },
    {
      name: 'Action',
      sortOrder: null,
      sortFn:null,
      listOfFilter: [],
    }
  ];