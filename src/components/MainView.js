import { Routes, Route, useLocation } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectView from './ProjectView';

import classes from './MainView.module.css';

const MainView = props => {
  const location = useLocation();
  const getLocalStorage = () => {
    const savedProjects = window.localStorage.getItem('projects');
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
    return props.projects;
  };
  const projects = getLocalStorage();

  return (
    <section>
      {location.pathname === '/' && (
        <div className={classes.head}>
          <h1>Projects Home</h1>
        </div>
      )}
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route
          path="/project/:projectId/*"
          element={<ProjectView projects={projects} />}
        />
      </Routes>
    </section>
  );
};

export default MainView;
