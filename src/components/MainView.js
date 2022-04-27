import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectView from './ProjectView';

import classes from './MainView.module.css';

const DUMMY_PROJECTS = [
  {
    id: 'p1651016613615',
    title: 'Cool Project',
    tasks: [
      {
        id: 'task1651076819110',
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
            changeBy: 'Guest',
          },
          {
            type: 'details',
            details:
              'The UI is lackluster we need to add another element such as a sidebar or an overview panel',
            date: new Date(),
            changeBy: 'Guest',
          },
          {
            type: 'dueDate',
            details: new Date(),
            date: new Date(),
            changeBy: 'Guest',
          },
          {
            type: 'taskAdd',
            details: 'Get Approval',
            date: new Date(),
            changeBy: 'Guest',
          },
          {
            type: 'taskRemove',
            details: 'Get Approval',
            date: new Date(),
            changeBy: 'Guest',
          },
          {
            type: 'priority',
            details: 'high',
            date: new Date(),
            changeBy: 'Guest',
          },
          {
            type: 'tags',
            details: 'logo title important',
            date: new Date(),
            changeBy: 'Guest',
          },
        ],
        dateCreated: new Date(),
        dateUpdated: new Date(),
        dueDate: new Date(),
        progress: 0,
        priority: 'high',
        status: 'completed',
        tags: ['logo', 'title', 'important'],
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076824794',
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
            createdBy: 'Guest',
            datePosted: new Date(),
            comment:
              "I think we need to adjust some of the details on this task because it won't mee dedline",
          },
          {
            id: 'comment2',
            createdBy: 'Guest',
            datePosted: new Date(),
            comment: 'You are totally right',
          },
          {
            id: 'comment3',
            createdBy: 'Guest',
            datePosted: new Date(),
            comment: 'You are totally right',
          },
          {
            id: 'comment4',
            createdBy: 'Guest',
            datePosted: new Date(),
            comment: 'You are totally right',
          },
          {
            id: 'comment5',
            createdBy: 'Guest',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076834756',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076844644',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076854481',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076862406',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076869165',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
      {
        id: 'task1651076876615',
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
        createdBy: 'Guest',
        lastUpdatedBy: 'Guest',
      },
    ],
  },
  {
    id: 'p1651076882502',
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
  const navigate = useNavigate();
  const location = useLocation();

  const updateProjectsHandler = incomingProject => {
    const projectIndex = projects.findIndex(
      proj => proj.id === incomingProject.id
    );
    const projectsToUpdate = [...projects];
    projectsToUpdate[projectIndex] = incomingProject;

    setProjects(projectsToUpdate);
    updateLocalStorageHandler(projectsToUpdate);
  };

  const updateLocalStorageHandler = incomingProjects => {
    window.localStorage.setItem('projects', JSON.stringify(incomingProjects));
  };

  const addNewProjectHandler = () => {
    const newId = `p${Date.now()}`;
    const projectsToUpdate = [...projects];
    projectsToUpdate.push({
      id: newId,
      title: 'Click here to name project',
      tasks: [],
    });
    setProjects(projectsToUpdate);
    updateLocalStorageHandler(projectsToUpdate);
    // window.localStorage.setItem('projects', JSON.stringify(projectsToUpdate));

    navigate(`/project/${newId}`);
  };

  const deleteProjectHandler = incomingProject => {
    const projectsToUpdate = [...projects];
    const projectIndex = projects.findIndex(
      project => incomingProject.id === project.id
    );
    projectsToUpdate.splice(projectIndex, 1);
    setProjects(projectsToUpdate);
    updateLocalStorageHandler(projectsToUpdate);
  };

  return (
    <section>
      {location.pathname === '/' && (
        <div className={classes.head}>
          <h1>Projects</h1>
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
              onUpdateProject={updateProjectsHandler}
              onDeleteProject={deleteProjectHandler}
            />
          }
        />
      </Routes>
    </section>
  );
};

export default MainView;
