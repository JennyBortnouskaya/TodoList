import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    removeTodoList: (id: string) => void

}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id);
            setTitle("");
        } else {
            setError("Title is required!")
        }

    }
    const changeTaskStatus = () => {

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        let newIsDoneValue = e.currentTarget.checked;
        // props.changeTaskStatus(t.id, newIsDoneValue);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompleteClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => props.removeTodoList(props.id);

    const onChangeTodoListTitle = (newValue: string) => {

        props.changeTodoListTitle(props.id, newValue);
    }


    const tasksList = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
        }
        const onChangeTitleHandler = (newValue: string) => {

            props.changeTaskTitle(t.id, newValue, props.id);
        }

        return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox color='primary' checked={t.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={onClickHandler}><Delete/></IconButton>
            </div>
        )
    })

    const allBtnClass = props.filter === "all" ? "outlined" : "text";
    const activeBtnClass = props.filter === "active" ? "outlined" : "text";
    const completeBtnClass = props.filter === "completed" ? "outlined" : "text";

    // const addTaskToTodoList = (title: string) => props.addTask(title, props.id)


    return <div>
        <h3><EditableSpan title={props.title} onChange={onChangeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <div>
            <TextField variant='outlined'
                       onChange={onChangeHandler}
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
        </div>
            {tasksList}
        <div>
            <Button variant={allBtnClass}
                    onClick={onAllClickHandler}
                    color={"default"}>All
            </Button>
            <Button variant={activeBtnClass} onClick={onActiveClickHandler} color={"primary"}>Active
            </Button>
            <Button variant={completeBtnClass} onClick={onCompleteClickHandler} color={"secondary"}>Completed
            </Button>
        </div>
    </div>
}
