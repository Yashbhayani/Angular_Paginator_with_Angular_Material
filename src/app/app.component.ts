import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'paginator';
  pageSize: any = 5;
  pageSizeOptions: any = 0;
  displayedColumns: string[] = ['select', 'id', 'name', 'progress', 'fruit'];
  dataSource = new MatTableDataSource<UserData>();
  selection: any = new SelectionModel<UserData>(true, []);
  isSelected: boolean = false;
  isArray: any = [];
  isArrayc: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  toggleAllRows(event: any) {
    // debugger;
    if (this.isArray[this.pageSizeOptions] === true) {
      this.isArray[this.pageSizeOptions] = false;

      for (
        var i = this.pageSize * this.pageSizeOptions;
        i < this.pageSize * (this.pageSizeOptions + 1);
        i++
      ) {
        this.selection.deselect(this.dataSource.data[i]);
        this.isSelected = false;
      }
      return;
    }

    let data = {
      pageSize: this.pageSize,
      pageIndex: this.pageSizeOptions,
      value: true,
    };
    this.isArray[this.pageSizeOptions] = true;
    this.isArrayc[this.pageSizeOptions] = this.pageSize;
    console.log(
      this.pageSize * this.pageSizeOptions,
      this.pageSize * (this.pageSizeOptions + 1)
    );

    for (
      var i = this.pageSize * this.pageSizeOptions;
      i < this.pageSize * (this.pageSizeOptions + 1);
      i++
    ) {
      this.selection.select(this.dataSource.data[i]);
    }
    this.isSelected = true;

    console.log(this.selection);
    // this.selection.select(...this.dataSource.data);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  ChangePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageSizeOptions = event.pageIndex;
    if (
      this.isArray[event.pageIndex] === true &&
      this.isArrayc[this.pageSizeOptions] === event.pageSize
    ) {
      if (this.isArrayc[this.pageSizeOptions] !== event.pageSize) {
        this.isArray[this.pageSizeOptions] = false;
        this.isArrayc[this.pageSizeOptions] = this.pageSize;
        this.isSelected = false;
      } else {
        this.isSelected = true;
      }
    } else {
      this.isArray[this.pageSizeOptions] = false;
      this.isArrayc[this.pageSizeOptions] = this.pageSize;
      this.isSelected = false;
    }
  }

  pag(ui: any, ui1: any, ui2: any) {
    console.log(ui, ui1, ui2);
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
