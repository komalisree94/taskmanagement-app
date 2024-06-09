import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectTaskById } from '../data/tasks.selector';
import { switchMap } from 'rxjs';
import { Task } from '../data/task';
import { invokeUpdateTaskAPI } from '../data/tasks.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  taskForm: FormGroup;
  priority: string[] = [
    'Low',
    'Medium',
    'High',
  ];

  status: string[] = [
    'New',
    'Pending',
    'Completed',
  ];

  constructor(private _data: Store,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) {
    this.taskForm = this._fb.group({
      id: '',
      title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      duedate: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit(): void {

    let fetchFormData$ = this._route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this._data.pipe(select(selectTaskById(id)))
      })
    )

    fetchFormData$.subscribe((data) => {
      if (data) {
        this.taskForm.patchValue(data);
      }
    })
  }

  updateTask() {

    this._data.dispatch(invokeUpdateTaskAPI({ payload: { ...this.taskForm.value } }));
    this._router.navigate(['/']);
  }

  public errorHandling = (control: string, error: string) => {
    return this.taskForm.controls[control].hasError(error);
  }
}
