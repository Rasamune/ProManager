import { useState, useEffect, useCallback } from 'react';
import classes from './TaskList.module.css';
import TaskItem from './TaskItem';

const TaskList = props => {
  const projectTasks = props.tasks;
  const [projectTasksColumns, setProjectTasksColumns] = useState({
    taskFirstColumn: [],
    taskSecondColumn: [],
    taskThirdColumn: [],
  });

  const checklistClickHandler = useCallback(
    (incomingTask, itemId, itemChecked) => {
      props.onChecklistHandler(incomingTask, itemId, itemChecked);
    },
    [props]
  );

  useEffect(() => {
    let taskFirstColumn = [];
    let taskSecondColumn = [];
    let taskThirdColumn = [];

    projectTasks.forEach((task, index) => {
      if ((index + 1) % 3 === 0) {
        // Populate 3rd Column
        taskThirdColumn.push(
          <TaskItem
            key={task.id}
            task={task}
            onChecklistClick={checklistClickHandler}
          />
        );
        return;
      }
      if ((index + 1) % 3 === 2) {
        // Populate 2nd Column
        taskSecondColumn.push(
          <TaskItem
            key={task.id}
            task={task}
            onChecklistClick={checklistClickHandler}
          />
        );
        return;
      }
      // Populate 1st Column
      taskFirstColumn.push(
        <TaskItem
          key={task.id}
          task={task}
          onChecklistClick={checklistClickHandler}
        />
      );
    });

    setProjectTasksColumns({
      taskFirstColumn,
      taskSecondColumn,
      taskThirdColumn,
    });
  }, [checklistClickHandler, projectTasks]);

  return (
    <div className={classes['tasks-container']}>
      <div className={classes.column}>
        {projectTasksColumns.taskFirstColumn}
      </div>
      <div className={classes.column}>
        {projectTasksColumns.taskSecondColumn}
      </div>
      <div className={classes.column}>
        {projectTasksColumns.taskThirdColumn}
      </div>
    </div>
  );
};

export default TaskList;