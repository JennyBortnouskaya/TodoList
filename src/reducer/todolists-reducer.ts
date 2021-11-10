import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT} from "./tasks-reducer";

export type RemoveTodoListsAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodoListsAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodoListsFilterAT ={
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ChangeTodoListsTitleAT ={
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ActionType =  RemoveTodoListsAT | AddTodoListsAT | ChangeTodoListsFilterAT | ChangeTodoListsTitleAT

export const todoListsReducer =
    (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todolistId)

        case "ADD-TODOLIST":
            const newTodoListID = action.todolistId
            const todoList: TodolistType ={
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, todoList]

        case "CHANGE-TODOLIST-FILTER" :
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        default:
            throw todoLists;
    }

}
export const addTodolistAC = (title: string): AddTodoListsAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListsAT => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}