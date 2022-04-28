import { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useMatch,
  Link,
} from 'react-router-dom';
import TaskListFilter from './TaskListFilter';
import TaskList from './TaskList';
import TaskView from './TaskView';
import ProjectProgress from './ProjectProgress';
import classes from './ProjectView.module.css';

const ProjectView = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchPath = useMatch(location.pathname);
  const searchBarRef = useRef();
  const projects = props.projects;
  const { projectId } = useParams();
  const project = projects.find(project => project.id === projectId);
  const [projectTasks, setProjectTasks] = useState([]);
  const [editProjectTitle, setEditProjectTitle] = useState({
    editting: false,
    value: '',
  });
  const [deletingProject, setDeletingProject] = useState(false);
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
    search: {
      value: '',
    },
  });

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

    updateProject(tasks);
    setProjectTasks(tasks);
    navigate(`${matchPath.pathnameBase}/${newId}`);
  };

  const updateTaskHandler = incomingTask => {
    const tasks = [...projectTasks];
    const taskIndex = tasks.findIndex(task => incomingTask.id === task.id);
    const newComment =
      tasks[taskIndex].comments.length !== incomingTask.comments.length;

    const updatedTask = updateTaskProgress(incomingTask);

    // Do not update time if new comment is added
    if (!newComment) {
      updatedTask.dateUpdated = new Date();
    }

    tasks[taskIndex] = updatedTask;

    updateProject(tasks);
    setProjectTasks(tasks);
  };

  const deleteTaskHandler = incomingTask => {
    const tasks = [...projectTasks];
    const taskIndex = tasks.findIndex(task => incomingTask.id === task.id);
    tasks.splice(taskIndex, 1);

    updateProject(tasks);
    setProjectTasks(tasks);
  };

  const updateProject = tasksToSave => {
    const projectToSave = { ...project };
    projectToSave.tasks = tasksToSave;
    props.onUpdateProject(projectToSave);
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

  const editInputHandler = e => {
    let value =
      e.target.textContent === 'Click here to name project'
        ? ''
        : e.target.textContent;

    setEditProjectTitle({
      editting: true,
      value: value,
    });
  };

  const inputBlurHandler = e => {
    const value = e.target.value;
    const type = e.target.dataset.type;
    finishEdittingInputHandler(value, type);
  };

  const inputEnterKeyHandler = e => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      const type = e.target.dataset.type;
      finishEdittingInputHandler(value, type);
    }
  };

  const finishEdittingInputHandler = (value, type) => {
    // If values are empty, cancel editting
    if (
      ((value === '' || value.length === 0) && type !== 'tags') ||
      value === editProjectTitle.value
    ) {
      setEditProjectTitle(prevState => ({
        ...prevState,
        editting: false,
      }));
      return;
    }
    setEditProjectTitle(prevState => ({
      ...prevState,
      editting: false,
      value: null,
    }));
    const updatedProject = {
      ...project,
      title: value,
    };

    props.onUpdateProject(updatedProject);
  };

  const searchHandler = e => {
    if (e.key === 'Enter' || e.target.dataset.search === 'search') {
      const value = searchBarRef.current.value;
      setFilters(prevState => ({
        ...prevState,
        search: {
          value,
        },
      }));
      searchBarRef.current.value = '';
    }
  };

  const removeSearchResultsHandler = () => {
    setFilters(prevState => ({
      ...prevState,
      search: {
        value: '',
      },
    }));
  };

  const deleteProjectVerifyHandler = () => {
    setDeletingProject(true);
  };

  const deleteProjectHandler = () => {
    setDeletingProject(false);
    props.onDeleteProject(project);
  };

  const deleteProjectCancelHandler = () => {
    setDeletingProject(false);
  };

  useEffect(() => {
    if (!project) navigate('/', { replace: true });
    if (project) setProjectTasks(project.tasks);
  }, [project, navigate]);

  return (
    <section>
      {project && (
        <>
          <div className={classes.mininav}>
            <div className={classes.navigator}>
              <ul>
                <li>
                  <Link to="/">Projects</Link>
                </li>
                <li>
                  <Link to={`/project/${project.id}`}>{project.title}</Link>
                </li>
              </ul>
            </div>
            {matchPath.pathnameBase === `/project/${project.id}` && (
              <div className={classes.searchbar}>
                <input
                  className={classes.searchInput}
                  onKeyDown={searchHandler}
                  ref={searchBarRef}
                />
                <button
                  className={classes.searchbutton}
                  onClick={searchHandler}
                  data-search="search"
                >
                  Search
                </button>
              </div>
            )}
          </div>
          <div className={classes.head}>
            {!editProjectTitle.editting && (
              <h1 onClick={editInputHandler}>{project.title}</h1>
            )}
            {editProjectTitle.editting && (
              <input
                autoFocus
                className={classes.title}
                type="text"
                defaultValue={editProjectTitle.value}
                onBlur={inputBlurHandler}
                onKeyDown={inputEnterKeyHandler}
                data-type="title"
              />
            )}
            <div className={classes['right-column']}>
              {!deletingProject && (
                <div
                  className={classes['delete-project']}
                  onClick={deleteProjectVerifyHandler}
                >
                  Delete Project
                </div>
              )}
              {deletingProject && (
                <div className={classes.confirmdelete}>
                  <div
                    className={classes.confirm}
                    onClick={deleteProjectHandler}
                  >
                    Confirm Delete
                  </div>
                  <div
                    className={classes.cancel}
                    onClick={deleteProjectCancelHandler}
                  >
                    Cancel
                  </div>
                </div>
              )}
              {matchPath.pathnameBase === `/project/${project.id}` && (
                <>
                  <button
                    className={classes['new-task']}
                    onClick={addNewTaskHandler}
                  >
                    + New Task
                  </button>
                </>
              )}
            </div>
            <ProjectProgress tasks={projectTasks} />
          </div>
          {matchPath.pathnameBase === `/project/${project.id}` && (
            <TaskListFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}
          {matchPath.pathnameBase === `/project/${project.id}` &&
            filters.search.value !== '' && (
              <div className={classes['search-results-container']}>
                <div
                  className={classes.searchresults}
                  onClick={removeSearchResultsHandler}
                >
                  Displaying results for: <span>{filters.search.value}</span>{' '}
                </div>
              </div>
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

            {projectTasks.length > 0 && (
              <Route
                path="/:taskId"
                element={
                  <TaskView
                    tasks={projectTasks}
                    onUpdateTask={updateTaskHandler}
                    onDeleteTask={deleteTaskHandler}
                    location={`/project/${project.id}`}
                  />
                }
              />
            )}
          </Routes>
        </>
      )}
    </section>
  );
};

export default ProjectView;
