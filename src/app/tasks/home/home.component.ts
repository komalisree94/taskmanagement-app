import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store'
import { selectTasks } from '../data/tasks.selector';
import { invokeDeleteTaskAPI, invokeTasksAPI, invokeUpdateStatusAPI, invokeUpdateTaskAPI } from '../data/tasks.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  taskForm: FormGroup;
  checked: boolean = true;
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'duedate',
    'priority',
    'status',
    'action'
  ];

  constructor(private _data: Store,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.taskForm = this._fb.group({
      id: '',
      status: '',
    });
  }

  tasks$ = this._data.pipe(select(selectTasks))

  ngOnInit(): void {

    this.getTasksData();
    this._data.dispatch(invokeTasksAPI());
  }

  deleteTask(rowId: number) {
    this._data.dispatch(invokeDeleteTaskAPI({ id: rowId }))
  }

  getTasksData() {
    this.tasks$.subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeValue(rowId: number) {
    this._data.dispatch(invokeUpdateStatusAPI({ payload: { id: rowId, status: 'Completed' } }));
    this._router.navigate(['/']);
  }

}
