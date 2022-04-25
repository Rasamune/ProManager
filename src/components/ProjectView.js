import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
        lastUpdatedBy: 'Rasamune',
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
        priority: 'medium',
        status: 'inprogress',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
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
        priority: 'low',
        status: 'completed',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
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
        priority: 'low',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
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
        priority: 'low',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
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
        priority: 'low',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
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
        priority: 'low',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
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
        priority: 'low',
        status: 'new',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Rasamune',
        lastUpdatedBy: 'Rasamune',
      },
    ],
  },
];

const getLocalStorage = () => {
  const savedTasks = window.localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return DUMMY_PROJECT[0].tasks;
};

const ProjectView = () => {
  const [projectTasks, setProjectTasks] = useState(getLocalStorage());
  const navigate = useNavigate();

  const updateTaskProgress = task => {
    // Set Task Status
    let taskState = {
      status: 'completed',
      count: 0,
    };
    task.checklist.forEach(item => {
      if (item.completed === false) {
        taskState.status = 'inprogress';
        taskState.count++;
      }
    });
    if (taskState.count === task.checklist.length) {
      taskState.status = 'new';
    }
    task.status = taskState.status;

    return task;
  };

  const addNewTaskHandler = () => {
    const tasks = [...projectTasks];
    const newId = `task${Date.now()}`;
    const newTask = {
      id: newId,
      title: 'Click here to name the task',
      details: 'Click here to give the task a description',
      checklist: [],
      dateCreated: new Date(),
      dateUpdated: new Date(),
      dueDate: new Date(),
      progress: 0,
      priority: 'low',
      status: 'new',
      tags: [],
      createdBy: 'Rasamune',
      lastUpdatedBy: 'Rasamune',
    };
    tasks.push(newTask);

    updateLocalStorage(tasks);
    setProjectTasks(tasks);
    navigate(`/${newId}`);
  };

  const updateTaskHandler = incomingTask => {
    const tasks = [...projectTasks];
    const taskIndex = tasks.findIndex(task => incomingTask.id === task.id);

    const updatedTask = updateTaskProgress(incomingTask);
    updatedTask.dateUpdated = new Date();
    tasks[taskIndex] = updatedTask;

    updateLocalStorage(tasks);
    setProjectTasks(tasks);
  };

  const deleteTaskHandler = incomingTask => {
    const tasks = [...projectTasks];
    const taskIndex = tasks.findIndex(task => incomingTask.id === task.id);
    tasks.splice(taskIndex, 1);

    updateLocalStorage(tasks);
    setProjectTasks(tasks);
  };

  const updateLocalStorage = tasksToSave => {
    window.localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  };

  return (
    <section>
      <div className={classes.head}>
        <h1>{DUMMY_PROJECT[0].title}</h1>
        <button className={classes['new-task']} onClick={addNewTaskHandler}>
          + New Task
        </button>
        <ProjectProgress tasks={projectTasks} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <TaskList tasks={projectTasks} onUpdateTask={updateTaskHandler} />
          }
        />
        <Route
          path="/:taskId"
          element={
            <TaskView
              tasks={projectTasks}
              onUpdateTask={updateTaskHandler}
              onDeleteTask={deleteTaskHandler}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default ProjectView;
