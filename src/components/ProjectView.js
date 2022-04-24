import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskView from './TaskView';
import ProjectProgress from './ProjectProgress';
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
        comments: [
          {
            id: 'comment1',
            createdBy: 'Rasamune',
            datePosted: new Date(),
            comment:
              "I think we need to adjust some of the details on this task because it won't mee dedline",
          },
          {
            id: 'comment2',
            createdBy: 'Catherine',
            datePosted: new Date(),
            comment: 'You are totally right',
          },
          {
            id: 'comment3',
            createdBy: 'Catherine',
            datePosted: new Date(),
            comment: 'You are totally right',
          },
          {
            id: 'comment4',
            createdBy: 'Catherine',
            datePosted: new Date(),
            comment: 'You are totally right',
          },
          {
            id: 'comment5',
            createdBy: 'Catherine',
            datePosted: new Date(),
            comment: 'You are totally right',
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

  return (
    <section>
      <div className={classes.head}>
        <h1>{DUMMY_PROJECT[0].title}</h1>
        <ProjectProgress tasks={projectTasks} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={projectTasks}
              onChecklistHandler={checklistClickHandler}
            />
          }
        />
        <Route
          path="/:taskId"
          element={
            <TaskView
              tasks={projectTasks}
              onChecklistHandler={checklistClickHandler}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default ProjectView;
