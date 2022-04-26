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
  const isMobileView = window.innerWidth < 768;
  const filters = props.filters;

  const checklistClickHandler = useCallback(
    task => {
      props.onUpdateTask(task);
    },
    [props]
  );

  const filterTasks = useCallback(
    tasks => {
      // Reverse Task List (Newest First)
      tasks.reverse();

      // Filter Time
      if (filters.time.value !== 'new') {
        if (filters.time.value === 'update') {
          tasks.sort((a, b) => {
            return new Date(b.dateUpdated) - new Date(a.dateUpdated);
          });
        }
        if (filters.time.value === 'dueDate') {
          tasks.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
          });
        }
        if (filters.time.value === 'old') {
          tasks.reverse();
        }
      }

      const filter = (tasks, filterValue, compareValue) => {
        if (filterValue !== 'all') {
          let tasksFiltered = [];
          let tasksRemainder = [];

          tasks.forEach(task => {
            if (task[compareValue] === filterValue) {
              tasksFiltered.push(task);
              return;
            }
            tasksRemainder.push(task);
          });
          tasks = [...tasksFiltered, ...tasksRemainder];

          return tasks;
        }
        return tasks;
      };

      tasks = filter(tasks, filters.priority.value, 'priority');
      tasks = filter(tasks, filters.progress.value, 'status');

      return tasks;
    },
    [filters]
  );

  const newTaskItemComponent = useCallback(
    task => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          onChecklistClick={checklistClickHandler}
          view={filters.view.value}
        />
      );
    },
    [checklistClickHandler, filters.view]
  );

  useEffect(() => {
    let tasks = [...projectTasks];
    let taskFirstColumn = [];
    let taskSecondColumn = [];
    let taskThirdColumn = [];

    tasks = filterTasks(tasks);

    if (isMobileView) {
      tasks.forEach((task, index) => {
        taskFirstColumn.push(newTaskItemComponent(task));
      });

      setProjectTasksColumns({
        taskFirstColumn,
      });
      return;
    }

    tasks.forEach((task, index) => {
      if ((index + 1) % 3 === 0) {
        // Populate 3rd Column
        taskThirdColumn.push(newTaskItemComponent(task));
        return;
      }
      if ((index + 1) % 3 === 2) {
        // Populate 2nd Column
        taskSecondColumn.push(newTaskItemComponent(task));
        return;
      }
      // Populate 1st Column
      taskFirstColumn.push(newTaskItemComponent(task));
    });
    setProjectTasksColumns({
      taskFirstColumn,
      taskSecondColumn,
      taskThirdColumn,
    });
  }, [newTaskItemComponent, filterTasks, projectTasks, isMobileView]);

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
