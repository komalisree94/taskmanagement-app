import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksService } from "../tasks.service";
import { invokeSaveTaskAPI, invokeTasksAPI, getTasksAPISuccess, saveTaskAPISuccess, invokeUpdateTaskAPI, updateTaskAPISuccess, invokeDeleteTaskAPI, deleteTaskAPISuccess, invokeUpdateStatusAPI, updateStatusAPISuccess } from "./tasks.action";
import { map, switchMap } from "rxjs";

@Injectable()
export class TasksEffects {

    constructor(private actions$: Actions,
        private taskService: TasksService) { }

    loadAllTasks$ = createEffect(() =>

        this.actions$.pipe(
            ofType(invokeTasksAPI),
            switchMap(() => {
                return this.taskService
                    .getTasks()
                    .pipe(map((data) => getTasksAPISuccess({ allTasks: data })));
            })
        )
    );

    saveNewTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeSaveTaskAPI),
            switchMap((action) => {
                return this.taskService
                    .createTask(action.payload)
                    .pipe(map((data) => saveTaskAPISuccess({ response: data })));
            })
        )

    );

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUpdateTaskAPI),
            switchMap((action) => {
                return this.taskService
                    .updateTask(action.payload)
                    .pipe(map((data) => updateTaskAPISuccess({ response: data })));
            })
        )

    );

    updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUpdateStatusAPI),
            switchMap((action) => {
                return this.taskService
                    .updateStatus(action.payload)
                    .pipe(map((data) => updateStatusAPISuccess({ response: data })));
            })
        )

    );


    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeDeleteTaskAPI),
            switchMap((action) => {
                return this.taskService
                    .deleteTask(action.id)
                    .pipe(map((data) => deleteTaskAPISuccess({ id: action.id })));
            })
        )

    );

}
