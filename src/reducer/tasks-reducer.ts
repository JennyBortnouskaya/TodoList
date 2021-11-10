import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTasksAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListsId: string
}

export type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListsId: string
}

export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    id: string
    isDone: boolean
    todoListID: string
}

export type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    id: string
    newTitle: string
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}


export type ActionType = RemoveTasksAT | AddTaskAT | ChangeTaskStatusAT |
    ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer =
    (state: TasksStateType, action: ActionType) => {
        switch (action.type) {
            case "REMOVE-TASK":
                return {
                    ...state, [action.todoListsId]: state[action.todoListsId]
                        .filter(task => task.id !== action.taskId)
                }

            case "ADD-TASK":
                return {
                    ...state, [action.todoListsId]: [{id: v1(), title: action.title, isDone: false},
                        ...state[action.todoListsId]]
                }

            case "CHANGE-TASK-STATUS":
                return {
                    ...state, [action.todoListID]: state[action.todoListID]
                        .map(task => task.id !== action.id ? task : {...task, isDone: action.isDone})
                }

            case "CHANGE-TASK-TITLE":
                return {
                    ...state, [action.todoListID]: state[action.todoListID]
                        .map(task => task.id !== action.id ? task : {...task, title: action.newTitle})
                }

            case "ADD-TODOLIST":
                return {
                    ...state, [action.todoListID]: []
                }
            case "REMOVE-TODOLIST":
                let newState = {...state}
                delete newState[action.todoListID]
                return newState

            default:
                throw new Error('I dont understand this type');
        }

    }
export const removeTaskAC = (taskId: string, todoListsId: string): RemoveTasksAT => {
    return {type: 'REMOVE-TASK', taskId, todoListsId}
}

export const addTaskAC = (title: string, todoListsId: string): AddTaskAT => {
    return {type: 'ADD-TASK', title, todoListsId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todoListID}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todoListID}
}

export const addTodolistAC = (title: string,  todoListID: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title, todoListID }
}

export const removeTodolistAC = (todoListID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID}
}
