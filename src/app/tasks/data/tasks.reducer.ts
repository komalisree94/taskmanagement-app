import { createReducer, on } from "@ngrx/store";
import { Task } from "./task";
import { deleteTaskAPISuccess, getTasksAPISuccess, saveTaskAPISuccess, updateStatusAPISuccess, updateTaskAPISuccess } from "./tasks.action";

export const initialState: ReadonlyArray<Task> = [];

export const taskReducer = createReducer(
    initialState,
    on(getTasksAPISuccess, (state, { allTasks }) => {
        return allTasks;
    }),
    on(saveTaskAPISuccess, (state, { response }) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
    }),
    on(updateTaskAPISuccess, (state, { response }) => {
        let newState = state.filter(_ => _.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(updateStatusAPISuccess, (state, { response }) => {
        let newState = state.filter(_ => _.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(deleteTaskAPISuccess, (state, { id }) => {
        let newState = state.filter(_ => _.id !== id);
        return newState;
    })
)
