import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectView from './ProjectView';

import classes from './MainView.module.css';

const DUMMY_PROJECTS = [
  {
    id: 'p1651016613615',
    title: 'Sample Project',
    tasks: [
      {
        id: 'task1651076819110',
        title: 'Add a secondary element to the UI',
        details:
          'The UI is lackluster we need to add another element such as a sidebar or an overview panel',
        checklist: [
          {
            id: 'check1651076819110',
            title: 'Decide which new feature to add',
            completed: true,
          },
          {
            id: 'check1651076819111',
            title: 'Calculate production time',
            completed: false,
          },
          {
            id: 'check1651076819112',
            title: 'Get approval',
            completed: false,
          },
        ],
        comments: [
          {
            id: 'comment1651076819112',
            createdBy: 'ProManager',
            datePosted: '2022-04-12',
            comment:
              'I think we need to adjust the sidebar to make it slide in and out',
          },
          {
            id: 'comment1651076819113',
            createdBy: 'ProManager',
            datePosted: '2022-04-12',
            comment: 'What kind of changes are we talking about?',
          },
        ],
        changelog: [
          {
            id: 'change1651076819113',
            type: 'itemCompleted',
            details: 'Decide which new feature to add',
            date: '2022-04-24',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819114',
            type: 'taskAdd',
            details: 'Get approval',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819115',
            type: 'taskAdd',
            details: 'Calculate production time',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819116',
            type: 'taskAdd',
            details: 'Decide which new feature to add',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819117',
            type: 'taskAdd',
            details: 'Decide which new feature to add',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819118',
            type: 'dueDate',
            details: '2022-05-01T13:00:00.000Z',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819119',
            type: 'tags',
            details: 'UI',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819120',
            type: 'details',
            details:
              'The UI is lackluster we need to add another element such as a sidebar or an overview panel',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819121',
            type: 'title',
            details: 'Add a secondary element to the UI',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
        ],
        dateCreated: new Date('2022-04-12'),
        dateUpdated: new Date('2022-04-24'),
        dueDate: new Date('2022-05-01T13:00:00.000Z'),
        progress: 0,
        priority: 'low',
        status: 'inprogress',
        tags: ['UI'],
        createdBy: 'ProManager',
        lastUpdatedBy: 'ProManager',
      },
      {
        id: 'task1651076824794',
        title: 'Make Logo',
        details: 'We need to make a logo for our Cool Project',
        checklist: [
          {
            id: 'check1651076824794',
            title: 'Draw a logo',
            completed: true,
          },
        ],
        comments: [
          {
            id: 'comment1651076819112',
            createdBy: 'ProManager',
            datePosted: '2022-04-13',
            comment: 'Does anybody have the designs for this?',
          },
        ],
        changelog: [
          {
            id: 'change1651076819113',
            type: 'itemCompleted',
            details: 'Draw Logo',
            date: '2022-04-23',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819117',
            type: 'taskAdd',
            details: 'Draw Logo',
            date: '2022-04-13',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819118',
            type: 'dueDate',
            details: '2022-05-01T13:00:00.000Z',
            date: '2022-04-13',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819119',
            type: 'tags',
            details: 'logo title important',
            date: '2022-04-13',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819120',
            type: 'details',
            details: 'We need to make a logo for our Cool Project',
            date: '2022-04-13',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819121',
            type: 'title',
            details: 'Make Logo',
            date: '2022-04-13',
            changeBy: 'ProManager',
          },
        ],
        dateCreated: new Date('2022-04-13'),
        dateUpdated: new Date('2022-04-23'),
        dueDate: new Date('2022-05-01T13:00:00.000Z'),
        progress: 0,
        priority: 'low',
        status: 'completed',
        tags: ['logo', 'title', 'important'],
        createdBy: 'ProManager',
        lastUpdatedBy: 'ProManager',
      },
      {
        id: 'task1651076834756',
        title: 'Develop the Backend',
        details: 'The framework for the backend needs developing',
        checklist: [
          {
            id: 'check1651076834756',
            title: 'Create a flowchart for the backend development',
            completed: false,
          },
          {
            id: 'check1651076834757',
            title: 'Start developing the main components of the backend',
            completed: false,
          },
          {
            id: 'check1651076834758',
            title: 'Implement API calls to the server',
            completed: false,
          },
        ],
        comments: [],
        changelog: [
          {
            id: 'change1651076819114',
            type: 'priority',
            details: 'medium',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819115',
            type: 'taskAdd',
            details: 'Implement API calls to the server',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819116',
            type: 'taskAdd',
            details: 'Start developing the main components of the backend',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819117',
            type: 'taskAdd',
            details: 'Create a flowchart for the backend development',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819118',
            type: 'dueDate',
            details: '2022-05-20T13:00:00.000Z',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819119',
            type: 'tags',
            details: 'backend API server programming',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819120',
            type: 'details',
            details: 'The framework for the backend needs developing',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819121',
            type: 'title',
            details: 'Develop the Backend',
            date: '2022-04-15',
            changeBy: 'ProManager',
          },
        ],
        dateCreated: new Date('2022-04-15'),
        dateUpdated: new Date('2022-04-15'),
        dueDate: new Date('2022-05-20T13:00:00.000Z'),
        progress: 0,
        priority: 'medium',
        status: 'new',
        tags: ['backend', 'API', 'server', 'programming'],
        createdBy: 'ProManager',
        lastUpdatedBy: 'ProManager',
      },
      {
        id: 'task1651076844644',
        title: 'Fix the filters',
        details: 'There is something buggy with the filters.',
        checklist: [
          {
            id: 'check1651076844644',
            title: "Test the filters to see what's causing the issue",
            completed: false,
          },
          {
            id: 'check1651076844645',
            title: 'Fix the issue',
            completed: false,
          },
        ],
        comments: [],
        changelog: [
          {
            id: 'change1651076819115',
            type: 'priority',
            details: 'high',
            date: '2022-04-12',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819116',
            type: 'taskAdd',
            details: 'Fix the issue',
            date: '2022-04-16',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819117',
            type: 'taskAdd',
            details: "Test the filters to see what's causing the issue",
            date: '2022-04-16',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819118',
            type: 'dueDate',
            details: '2022-04-20',
            date: '2022-04-16',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819119',
            type: 'tags',
            details: 'bug fix filter',
            date: '2022-04-16',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819120',
            type: 'details',
            details: 'There is something buggy with the filters.',
            date: '2022-04-16',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819121',
            type: 'title',
            details: 'Fix the filters',
            date: '2022-04-16',
            changeBy: 'ProManager',
          },
        ],
        dateCreated: new Date('2022-04-16'),
        dateUpdated: new Date('2022-04-16'),
        dueDate: new Date('2022-04-20'),
        progress: 0,
        priority: 'high',
        status: 'new',
        tags: ['bug', 'fix', 'filter'],
        createdBy: 'ProManager',
        lastUpdatedBy: 'ProManager',
      },
      {
        id: 'task1651076854481',
        title: 'Add Authentication',
        details:
          'Application needs authentication and a way for users to log in and out.',
        checklist: [
          {
            id: 'check1651076854481',
            title: 'Add authentication to the backend',
            completed: true,
          },
          {
            id: 'check1651076854482',
            title: 'Create login and logout pages',
            completed: false,
          },
        ],
        comments: [],
        changelog: [
          {
            id: 'change1651076819133',
            type: 'priority',
            details: 'high',
            date: '2022-04-22',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819113',
            type: 'itemCompleted',
            details: 'Decide which new feature to add',
            date: '2022-04-20',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819116',
            type: 'taskAdd',
            details: 'Create login and logout pages',
            date: '2022-04-17',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819117',
            type: 'taskAdd',
            details: 'Add authentication to the backend',
            date: '2022-04-17',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819118',
            type: 'dueDate',
            details: '2022-05-02T13:00:00.000Z',
            date: '2022-04-17',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819119',
            type: 'tags',
            details: 'athentication, backend, programming',
            date: '2022-04-17',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819120',
            type: 'details',
            details:
              'Application needs authentication and a way for users to log in and out.',
            date: '2022-04-17',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819121',
            type: 'title',
            details: 'Add Authentication',
            date: '2022-04-17',
            changeBy: 'ProManager',
          },
        ],
        dateCreated: new Date('2022-04-17'),
        dateUpdated: new Date('2022-04-22'),
        dueDate: new Date('2022-05-02T13:00:00.000Z'),
        progress: 0,
        priority: 'high',
        status: 'inprogress',
        tags: ['authentication', 'backend', 'programming'],
        createdBy: 'ProManager',
        lastUpdatedBy: 'ProManager',
      },
      {
        id: 'task1651076862406',
        title: 'Add SVG Icons',
        details:
          'We need some SVG icons to make the website more visually dynamic.',
        checklist: [
          {
            id: 'check1651076862406',
            title: 'Add icon for creating "New" items',
            completed: true,
          },
          {
            id: 'check1651076862407',
            title: 'Add icon for deleting items',
            completed: true,
          },
          {
            id: 'check1651076862408',
            title: 'Add icons for navigation',
            completed: true,
          },
          {
            id: 'check1651076862409',
            title: 'Add icon for filter view mobile',
            completed: true,
          },
        ],
        dateCreated: new Date('2022-04-19'),
        dateUpdated: new Date(),
        dueDate: new Date('2022-04-28T13:00:00.000Z'),
        comments: [
          {
            id: 'comment1651076819112',
            createdBy: 'ProManager',
            datePosted: '2022-04-19',
            comment: 'SVG files are available on the server',
          },
        ],
        changelog: [
          {
            id: 'change1651076819135',
            type: 'itemCompleted',
            details: 'Add icon for filter view mobile',
            date: new Date(),
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819134',
            type: 'itemCompleted',
            details: 'Add icons for navigation',
            date: new Date(),
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819133',
            type: 'itemCompleted',
            details: 'Add icon for deleting items',
            date: new Date(),
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819113',
            type: 'itemCompleted',
            details: 'Add icon for creating "New" items',
            date: new Date(),
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819114',
            type: 'taskAdd',
            details: 'Add icon for filter view mobile',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819115',
            type: 'taskAdd',
            details: 'Add icons for navigation',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819116',
            type: 'taskAdd',
            details: 'Add icon for deleting items',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819117',
            type: 'taskAdd',
            details: 'Add icon for creating "New" items',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819118',
            type: 'dueDate',
            details: '2022-04-28T13:00:00.000Z',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819119',
            type: 'tags',
            details: 'SVG icons UI',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819120',
            type: 'details',
            details:
              'We need some SVG icons to make the website more visually dynamic.',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
          {
            id: 'change1651076819121',
            type: 'title',
            details: 'Add SVG Icons',
            date: '2022-04-19',
            changeBy: 'ProManager',
          },
        ],
        progress: 0,
        priority: 'low',
        status: 'completed',
        tags: ['SVG', 'icons', 'UI'],
        createdBy: 'ProManager',
        lastUpdatedBy: 'ProManager',
      },
    ],
  },
  {
    id: 'p1651076882502',
    title: 'My New Project',
    tasks: [],
  },
];

console.log(DUMMY_PROJECTS);

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
