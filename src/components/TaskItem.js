import { useNavigate } from 'react-router-dom';
import classes from './TaskItem.module.css';

const TaskItem = props => {
  const navigate = useNavigate();
  const checklistClickHandler = e => {
    const task = { ...props.task };
    const itemIndex = task.checklist.findIndex(
      item => item.id === e.target.dataset.id
    );

    let checked;
    e.target.dataset.checked === 'true' ? (checked = false) : (checked = true);

    task.checklist[itemIndex].completed = checked;

    props.onChecklistClick(task);
  };
  const taskClickHandler = e => {
    if (e.target.classList.contains('listItem')) return;
    navigate(`/${props.task.id}`);
  };
  return (
    <div
      className={`${classes.task} ${
        props.task.status === 'completed' ? classes.completed : ''
      } ${props.task.status === 'inprogress' ? classes.inprogress : ''}`}
      onClick={taskClickHandler}
    >
      <h1>{props.task.title}</h1>
      <p>{props.task.details}</p>
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
      <div className={classes.footer}>
        <div className={`${classes.priority} ${classes[props.task.priority]}`}>
          <p>{props.task.priority}</p>
        </div>
        <p>9 minutes ago</p>
      </div>
    </div>
  );
};

export default TaskItem;
