import {
    AddTodoListsAT,
    ChangeTodoListsFilterAT,
    ChangeTodoListsTitleAT,
    RemoveTodoListsAT,
    todoListsReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

export const RemoveTodolistAC = (id: string): RemoveTodoListsAT => {
    return {type: 'REMOVE-TODOLIST', todolistId: v1()}
}
export const AddTodolistAC = (title: string, todolistId: string): AddTodoListsAT => {
    return {type: "ADD-TODOLIST", title: title, todolistId}
}
export const ChangeTodoListsFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListsFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export const ChangeTodoListsTitleAC = (id: string, title: string): ChangeTodoListsTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

// удаление todoList
test('correct todolist should be removed', () => {
    let todolistId1: string = v1();
    let todolistId2: string = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
// добавление todoList
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodolistAC(newTodolistTitle, todolistId1))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

// изменение заголовка todoList
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = ChangeTodoListsTitleAC(todolistId2, newTodolistTitle);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = ChangeTodoListsFilterAC(todolistId2, newFilter);

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


