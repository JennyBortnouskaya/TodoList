import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";


const changeTaskStatusCallBack = action('Status changed inside Task')
const changeTaskTitleCallBack = action('Title changed inside Task')
const removeTaskCallBack = action('Remove Button inside Task clicked')

export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        changeTaskStatus: changeTaskStatusCallBack,
        changeTaskTitle: changeTaskTitleCallBack,
        removeTask: removeTaskCallBack
    }
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    task: {id: '1', isDone: true, title: 'JS'},
    todoListId: '1'
};
