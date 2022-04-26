import { useNavigate } from 'react-router-dom';
import ProjectProgress from './ProjectProgress';
import classes from './ProjectItem.module.css';

const ProjectItem = props => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/project/${props.project.id}`);
  };
  const getProgressPercentage = () => {
    const progress = {
      completed: 0,
      inprogress: 0,
      new: 0,
      total: 0,
    };
    props.project.tasks.forEach(task => {
      const type = task.status;
      progress[type]++;
      progress.total++;
    });
    const percentage =
      ((progress.completed + progress.inprogress / 2) / progress.total) * 100;

    let string = `${Math.trunc(percentage)}%`;

    if (progress.total === 0) string = `Add a task to track progress`;

    return string;
  };

  return (
    <div className={classes['project-item']} onClick={onClickHandler}>
      <h1>{props.project.title}</h1>
      <div className={classes.progressamount}>{getProgressPercentage()}</div>
      <ProjectProgress tasks={props.project.tasks} />
    </div>
  );
};

export default ProjectItem;
