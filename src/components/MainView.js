import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectView from './ProjectView';

import classes from './MainView.module.css';

const DUMMY_PROJECTS = [
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
  {
    id: 'p2',
    title: 'Second Project',
    tasks: [],
  },
];

const getLocalStorage = () => {
  const savedProjects = window.localStorage.getItem('projects');
  if (savedProjects) {
    return JSON.parse(savedProjects);
  }
  return DUMMY_PROJECTS;
};

const MainView = () => {
  const [projects, setProjects] = useState(getLocalStorage());
  const location = useLocation();

  const updateProjectsHandler = incomingProject => {};

  const updateLocalStorageHandler = incomingProject => {
    const projectIndex = projects.findIndex(
      proj => proj.id === incomingProject.id
    );
    const projectsToUpdate = [...projects];
    projectsToUpdate[projectIndex] = incomingProject;

    window.localStorage.setItem('projects', JSON.stringify(projectsToUpdate));
  };

  const addNewProjectHandler = () => {
    const newId = `project${Date.now()}`;
    setProjects(prevState => [
      ...prevState,
      {
        id: newId,
        title: 'Add Title',
        tasks: [],
      },
    ]);

    // updateLocalStorageHandler(tasks);
  };

  return (
    <section>
      {location.pathname === '/' && (
        <div className={classes.head}>
          <h1>Project List</h1>
          <button
            className={classes['new-project']}
            onClick={addNewProjectHandler}
          >
            + New Project
          </button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<ProjectList projects={projects} />} />
        <Route
          path="/project/:projectId/*"
          element={
            <ProjectView
              projects={projects}
              onUpdateLocalStorage={updateLocalStorageHandler}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default MainView;
