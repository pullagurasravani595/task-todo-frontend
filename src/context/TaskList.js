import React from 'react';

const TaskList = React.createContext({
    taskListArr: [],
    addTaskDetails: () => {},
    removedTaskDetails: () => {}
});

export default TaskList;