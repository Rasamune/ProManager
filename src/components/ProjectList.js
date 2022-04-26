import ProjectItem from './ProjectItem';

import classes from './ProjectList.module.css';

const ProjectList = props => {
  const projects = props.projects;
  return (
    <div className={classes['projects-container']}>
      {projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
