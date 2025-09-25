import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useTimestamp } from '../hooks/use-timestamp';
import classes from './TaskItem.module.css';

const TaskItem = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchPath = useMatch(location.pathname);
  const timeStamp = useTimestamp(props.task.dateUpdated);
  const view = props.view;

  const checklistClickHandler = e => {
    const task = { ...props.task };
    const itemIndex = task.checklist.findIndex(
      item => item.id === e.target.dataset.id
    );

    let checked;
    e.target.dataset.checked === 'true' ? (checked = false) : (checked = true);

    let changelogEntry;
    if (checked) {
      changelogEntry = {
        type: 'itemCompleted',
        details: task.checklist[itemIndex].title,
        date: new Date(),
        changeBy: 'Guest',
      };
    } else {
      changelogEntry = {
        type: 'itemUnchecked',
        details: task.checklist[itemIndex].title,
        date: new Date(),
        changeBy: 'Guest',
      };
    }

    const updatedTask = {
      ...task,
      changelog: [changelogEntry, ...task.changelog],
      lastUpdatedBy: 'Guest',
    };
    updatedTask.checklist[itemIndex].completed = checked;

    props.onChecklistClick(updatedTask);
  };

  const taskClickHandler = e => {
    if (e.target.classList.contains('listItem')) return;
    navigate(`${matchPath.pathnameBase}/${props.task.id}`);
  };

  return (
    <button
      className={`${classes.task} ${
        props.task.status === 'completed' ? classes.completed : ''
      } ${props.task.status === 'inprogress' ? classes.inprogress : ''}`}
      onClick={taskClickHandler}
    >
      <h1>{props.task.title}</h1>
      <p>{props.task.details}</p>
      {view === 'expand' && (
        <>
          <div>
            <ul>
              {props.task.checklist.map(item => (
                <li
                  key={item.id}
                  className={item.completed ? classes.completed : ''}
                >
                  <span
                    data-id={item.id}
                    data-checked={item.completed}
                    className={`${classes.checkbox} listItem`}
                    onClick={checklistClickHandler}
                  ></span>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className={classes.footer}>
        <div className={`${classes.priority} ${classes[props.task.priority]}`}>
          <p>{props.task.priority}</p>
        </div>
        <p>Updated {timeStamp}</p>
      </div>
    </button>
  );
};

export default TaskItem;
