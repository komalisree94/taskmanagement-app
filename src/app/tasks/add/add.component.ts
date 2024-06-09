import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { invokeSaveTaskAPI } from '../data/tasks.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

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

  constructor(private _data: Store, private _fb: FormBuilder, private _router: Router) {
    this.taskForm = this._fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      duedate: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  saveTask(): void {
    debugger;
    if (this.taskForm.valid)
      this._data.dispatch(invokeSaveTaskAPI({ payload: this.taskForm.value }));
    this._router.navigate(['/']);

  }

  public errorHandling = (control: string, error: string) => {
    return this.taskForm.controls[control].hasError(error);
  }

}
