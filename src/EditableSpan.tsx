import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    onChange :(newValue:string) => void
}

export function EditableSpan(props: PropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const activateEditMode = () =>{
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () =>{
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }

    return editMode
       ? <TextField variant='outlined' value={title} onChange={onChangeSetTitle} autoFocus onBlur={activateViewMode}/>
       : <span onDoubleClick={activateEditMode}>{props.title}</span>



}