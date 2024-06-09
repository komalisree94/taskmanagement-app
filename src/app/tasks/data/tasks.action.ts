import { createAction, props } from "@ngrx/store";
import { Task } from "./task";


export const invokeTasksAPI = createAction(
    "[Tasks API] invoke tasks fetch api"
);

export const getTasksAPISuccess = createAction(

    "[Tasks API] tasks fetch api success",
    props<{ allTasks: Task[] }>()
);

export const invokeSaveTaskAPI = createAction(

    "[Tasks API] invoke save task api",
    props<{ payload: Task }>()
);

export const saveTaskAPISuccess = createAction(
    "[Tasks API] save task api success",
    props<{ response: Task }>()
);

export const invokeUpdateTaskAPI = createAction(

    "[Tasks API] invoke update task api",
    props<{ payload: Task }>()
);

export const invokeUpdateStatusAPI = createAction(

    "[Tasks API] invoke update status api",
    props<{ payload: { id: number, status: string } }>()
);

export const updateStatusAPISuccess = createAction(

    "[Tasks API] update status api success",
    props<{ response: Task }>()
);

export const updateTaskAPISuccess = createAction(

    "[Tasks API] update task api success",
    props<{ response: Task }>()
);

export const invokeDeleteTaskAPI = createAction(

    "[Tasks API] invoke delete task api",
    props<{ id: number }>()
);

export const deleteTaskAPISuccess = createAction(

    "[Tasks API] delete task api success",
    props<{ id: number }>()
);