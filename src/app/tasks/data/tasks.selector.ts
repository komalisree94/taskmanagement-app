import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "./task";


export const selectTasks = createFeatureSelector<Task[]>("mytasks")

export const selectTaskById = (taskId: number) => {

    return createSelector(
        selectTasks,
        (tasks: Task[]) => {

            var taskById = tasks.filter(_ => _.id == taskId);
            if (taskById.length == 0) {
                return null;
            }
            return taskById[0]
        }

    )
} 