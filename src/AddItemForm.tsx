import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type PropsType = {
    addItem: (title: string) => void

}

function AddItemForm(props: PropsType) {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<boolean>(false);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const errorMessage = error
        ? <p style={{margin: "0", color: "red"}}> Title is required!</p>
        // : <p style={{margin: "0"}}> Enter new task title</p>
        : null

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        {
            if (trimmedTitle !== "") {
                props.addItem(title);
            } else {
                setError(true)
            }
        }


    }
    return (
        <div>
            <TextField variant='outlined'
                       value={title}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressAddItem}
                       error={!!error}
                       label="Title"
                       helperText={errorMessage}
            />

            <IconButton color="primary" onClick={onClickAddItem}>
                <AddBox/>
            </IconButton>


        </div>
    )
}

export default AddItemForm