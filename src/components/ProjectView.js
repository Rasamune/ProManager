import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  useParams,
  useMatch,
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
  const projects = props.projects;
  const { projectId } = useParams();
  const project = projects.find(project => project.id === projectId);
  const [projectTasks, setProjectTasks] = useState([]);
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

  useEffect(() => {
    if (!project) navigate('/');
    if (project) setProjectTasks(project.tasks);
  }, [project, navigate]);

  return (
    <section>
      {project && (
        <>
          <div className={classes.head}>
            <h1>{project.title}</h1>
            {matchPath.pathnameBase === `/project/${project.id}` && (
              <button
                className={classes['new-task']}
                onClick={addNewTaskHandler}
              >
                + New Task
              </button>
            )}
            <ProjectProgress tasks={projectTasks} />
          </div>
          {matchPath.pathnameBase === `/project/${project.id}` && (
            <TaskListFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
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
                  location={`/project/${project.id}`}
                />
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
      )}
    </section>
  );
};

export default ProjectView;
