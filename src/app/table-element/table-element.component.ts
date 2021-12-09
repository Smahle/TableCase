import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TableUnits } from '../tableUnit';
import { TableUnitService } from '../tableUnitService';



@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.css']
})
export class TableElementComponent implements OnInit {
  /* this controls the order of elements in the table*/
  displayedColumns: string[] = ['name', 'age', 'lutefiskElsker', 'birthDay'];

  ELEMENT_DATA: TableUnits[] = [];
  errorMessage = '';

  /*linking the required MatTableDataSource to retrieved data*/
  dataSource!: MatTableDataSource<TableUnits>;

  constructor(private tableUnitService: TableUnitService) {
  }

  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getTableUnits();
  }

  getTableUnits(): void {
    this.tableUnitService.getTableUnits().subscribe({
      next: ELEMENT_DATA => {
        this.ELEMENT_DATA = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
      },
      error: err => this.errorMessage = err
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
