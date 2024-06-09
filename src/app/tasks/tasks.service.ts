import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './data/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private _http: HttpClient) { }

  getTasks(): Observable<any> {
    return this._http.get('http://localhost:3000/tasks');
  }

  createTask(payload: Task) {
    return this._http.post<Task>('http://localhost:3000/tasks', payload);
  }

  updateTask(payload: Task) {
    return this._http.put<Task>(`http://localhost:3000/tasks/${payload.id}`, payload);
  }

  updateStatus(payload: any) {
    return this._http.patch<Task>(`http://localhost:3000/tasks/${payload.id}`, payload);
  }

  deleteTask(id: number) {
    return this._http.delete(`http://localhost:3000/tasks/${id}`);
  }
}