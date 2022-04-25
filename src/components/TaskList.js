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

      // Filter Priority
      if (filters.priority.value !== 'all') {
        const tasksHighPriority = tasks.filter(
          task => task.priority === 'high'
        );
        const tasksMediumPriority = tasks.filter(
          task => task.priority === 'medium'
        );
        const tasksLowPriority = tasks.filter(task => task.priority === 'low');
        if (filters.priority.value === 'high') {
          tasks = [
            ...tasksHighPriority,
            ...tasksMediumPriority,
            ...tasksLowPriority,
          ];
        }
        if (filters.priority.value === 'medium') {
          tasks = [
            ...tasksMediumPriority,
            ...tasksHighPriority,
            ...tasksLowPriority,
          ];
        }
        if (filters.priority.value === 'low') {
          tasks = [
            ...tasksLowPriority,
            ...tasksMediumPriority,
            ...tasksHighPriority,
          ];
        }
      }

      // Filter Progress
      if (filters.progress.value !== 'all') {
        const tasksCompleted = tasks.filter(
          task => task.status === 'completed'
        );
        const tasksInProgress = tasks.filter(
          task => task.status === 'inprogress'
        );
        const tasksNotStarted = tasks.filter(task => task.status === 'new');
        if (filters.progress.value === 'completed') {
          tasks = [...tasksCompleted, ...tasksInProgress, ...tasksNotStarted];
        }
        if (filters.progress.value === 'inprogress') {
          tasks = [...tasksInProgress, ...tasksNotStarted, ...tasksCompleted];
        }
        if (filters.progress.value === 'new') {
          tasks = [...tasksNotStarted, ...tasksInProgress, ...tasksCompleted];
        }
      }
      return tasks;
    },
    [filters]
  );

  useEffect(() => {
    let tasks = [...projectTasks];
    let taskFirstColumn = [];
    let taskSecondColumn = [];
    let taskThirdColumn = [];

    tasks.reverse();

    tasks = filterTasks(tasks);

    if (isMobileView) {
      tasks.forEach((task, index) => {
        taskFirstColumn.push(
          <TaskItem
            key={task.id}
            task={task}
            onChecklistClick={checklistClickHandler}
            view={filters.view.value}
          />
        );
      });

      setProjectTasksColumns({
        taskFirstColumn,
      });

      return;
    }

    tasks.forEach((task, index) => {
      if ((index + 1) % 3 === 0) {
        // Populate 3rd Column
        taskThirdColumn.push(
          <TaskItem
            key={task.id}
            task={task}
            onChecklistClick={checklistClickHandler}
            view={filters.view.value}
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
            view={filters.view.value}
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
          view={filters.view.value}
        />
      );
    });
    setProjectTasksColumns({
      taskFirstColumn,
      taskSecondColumn,
      taskThirdColumn,
    });
  }, [
    checklistClickHandler,
    filterTasks,
    filters.view,
    projectTasks,
    isMobileView,
  ]);

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
