import classes from './ProjectProgress.module.css';

const ProjectProgress = props => {
  const tasks = props.tasks;
  let progressBarLength = tasks.length;

  const progress = {
    status: {
      completed: [],
      inprogress: [],
      remaining: [],
    },
  };

  const progressPoints = () => {
    tasks.forEach((task, index) => {
      switch (task.status) {
        case 'completed':
          progress.status.completed.push(
            <li key={`progress-${index}`} className={classes.completed}></li>
          );
          break;
        case 'inprogress':
          progress.status.inprogress.push(
            <li key={`progress-${index}`} className={classes.inprogress}></li>
          );
          break;
        default:
          progress.status.remaining.push(<li key={`progress-${index}`}></li>);
          break;
      }
    });
    const progressList = [
      ...progress.status.completed,
      ...progress.status.inprogress,
      ...progress.status.remaining,
    ];

    return progressList;
  };

  return (
    <div className={classes['progress-container']}>
      <ul style={{ gridTemplateColumns: `repeat(${progressBarLength}, 1fr)` }}>
        {progressPoints()}
      </ul>
    </div>
  );
};

export default ProjectProgress;
