import { useState, useEffect, useCallback } from 'react';
import TaskItem from './TaskItem';
import classes from './ProjectView.module.css';

const DUMMY_PROJECT = [
  {
    id: 'p1',
    title: 'Cool Project',
    tasks: [
      {
        id: 'card1',
        title: 'Make Logo',
        details: 'We need to make a logo for our Cool Project',
        checklist: [
          {
            id: 'check1',
            title: 'Draw a logo',
            completed: true,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'completed',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card2',
        title: 'Add a secondary element to the UI',
        details:
          'The UI is lackluster we need to add another element such as a sidebar or an overview panel',
        checklist: [
          {
            id: 'check1',
            title: 'Decide which new feature to add',
            completed: true,
          },
          {
            id: 'check2',
            title: 'Calculate production time',
            completed: false,
          },
          {
            id: 'check3',
            title: 'Get approval',
            completed: false,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'inprogress',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card3',
        title: 'Make Logo',
        details: 'We need to make a logo for our Cool Project',
        checklist: [
          {
            id: 'check1',
            title: 'Draw a logo',
            completed: true,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'completed',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card4',
        title: 'Make Logo',
        details: 'We need to make a logo for our Cool Project',
        checklist: [
          {
            id: 'check1',
            title: 'Draw a logo',
            completed: false,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card5',
        title: 'Develop the Backend',
        details: 'The framework for the backend needs developing',
        checklist: [
          {
            id: 'check1',
            title: 'Create a flowchart for the backend development',
            completed: false,
          },
          {
            id: 'check2',
            title: 'Start developing the main components of the backend',
            completed: false,
          },
          {
            id: 'check3',
            title: 'Implement API calls to the server',
            completed: false,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card6',
        title: 'Develop the Backend',
        details: 'The framework for the backend needs developing',
        checklist: [
          {
            id: 'check1',
            title: 'Create a flowchart for the backend development',
            completed: false,
          },
          {
            id: 'check2',
            title: 'Start developing the main components of the backend',
            completed: false,
          },
          {
            id: 'check3',
            title: 'Implement API calls to the server',
            completed: false,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card7',
        title: 'Develop the Backend',
        details: 'The framework for the backend needs developing',
        checklist: [
          {
            id: 'check1',
            title: 'Create a flowchart for the backend development',
            completed: false,
          },
          {
            id: 'check2',
            title: 'Start developing the main components of the backend',
            completed: false,
          },
          {
            id: 'check3',
            title: 'Implement API calls to the server',
            completed: false,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
      {
        id: 'card8',
        title: 'Develop the Backend',
        details: 'The framework for the backend needs developing',
        checklist: [
          {
            id: 'check1',
            title: 'Create a flowchart for the backend development',
            completed: false,
          },
          {
            id: 'check2',
            title: 'Start developing the main components of the backend',
            completed: false,
          },
          {
            id: 'check3',
            title: 'Implement API calls to the server',
            completed: false,
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
      },
    ],
  },
];

const ProjectView = () => {
  const [projectTasks, setProjectTasks] = useState(DUMMY_PROJECT[0].tasks);
  const [projectTasksColumns, setProjectTasksColumns] = useState({
    taskFirstColumn: [],
    taskSecondColumn: [],
    taskThirdColumn: [],
  });

  const checklistClickHandler = useCallback(
    (incomingTask, itemId, itemChecked) => {
      // Update Item on Checklist
      const tasks = [...projectTasks];
      const taskIndex = tasks.findIndex(task => incomingTask.id === task.id);
      const itemIndex = tasks[taskIndex].checklist.findIndex(
        item => item.id === itemId
      );

      itemChecked === 'true'
        ? (tasks[taskIndex].checklist[itemIndex].completed = false)
        : (tasks[taskIndex].checklist[itemIndex].completed = true);

      // Set Task Status
      let taskState = {
        status: 'completed',
        count: 0,
      };
      tasks[taskIndex].checklist.forEach(item => {
        if (item.completed === false) {
          taskState.status = 'inprogress';
          taskState.count++;
        }
      });
      if (taskState.count === tasks[taskIndex].checklist.length) {
        taskState.status = 'new';
      }
      tasks[taskIndex].status = taskState.status;

      setProjectTasks(tasks);
    },
    [projectTasks]
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
    <section>
      <div className={classes.head}>
        <h1>{DUMMY_PROJECT[0].title}</h1>
      </div>
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
    </section>
  );
};

export default ProjectView;
