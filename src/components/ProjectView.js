import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import TaskListFilter from './TaskListFilter';
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
        comments: [],
        changelog: [
          {
            type: 'title',
            details: 'Add a secondary element',
            date: new Date(),
            changeBy: 'Rasamune',
          },
          {
            type: 'details',
            details:
              'The UI is lackluster we need to add another element such as a sidebar or an overview panel',
            date: new Date(),
            changeBy: 'Rasamune',
          },
          {
            type: 'dueDate',
            details: new Date(),
            date: new Date(),
            changeBy: 'Rasamune',
          },
          {
            type: 'taskAdd',
            details: 'Get Approval',
            date: new Date(),
            changeBy: 'Rasamune',
          },
          {
            type: 'taskRemove',
            details: 'Get Approval',
            date: new Date(),
            changeBy: 'Rasamune',
          },
          {
            type: 'priority',
            details: 'high',
            date: new Date(),
            changeBy: 'Rasamune',
          },
          {
            type: 'tags',
            details: 'logo title important',
            date: new Date(),
            changeBy: 'Rasamune',
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
        changelog: [],
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
        changelog: [],
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
        comments: [],
        changelog: [],
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
        comments: [],
        changelog: [],
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
        comments: [],
        changelog: [],
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
        comments: [],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        changelog: [],
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
        comments: [],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        changelog: [],
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
  const [filters, setFilters] = useState({
    time: {
      value: 'new',
      name: 'Newest',
    },
    progress: {
      value: 'all',
      name: 'All Tasks',
    },
    priority: {
      value: 'all',
      name: 'Any Priority',
    },
    view: {
      value: 'expand',
      name: 'Expanded',
    },
  });
  const navigate = useNavigate();
  const location = useLocation();

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
      comments: [],
      changelog: [],
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

  const handleFilterChange = (type, value, name) => {
    setFilters(prevState => ({
      ...prevState,
      [type]: {
        value,
        name,
      },
    }));
  };

  return (
    <section>
      <div className={classes.head}>
        <h1>{DUMMY_PROJECT[0].title}</h1>
        {location.pathname === '/' && (
          <button className={classes['new-task']} onClick={addNewTaskHandler}>
            + New Task
          </button>
        )}
        <ProjectProgress tasks={projectTasks} />
      </div>
      {location.pathname === '/' && (
        <TaskListFilter filters={filters} onFilterChange={handleFilterChange} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={projectTasks}
              onUpdateTask={updateTaskHandler}
              filters={filters}
            />
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
