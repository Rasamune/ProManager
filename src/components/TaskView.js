import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './TaskView.module.css';

const TaskView = props => {
  const projectTasks = props.tasks;
  const { taskId } = useParams();
  const [task, setTask] = useState([]);

  const checklistClickHandler = e => {
    props.onChecklistHandler(
      task,
      e.target.dataset.id,
      e.target.dataset.checked
    );
  };

  useEffect(() => {
    const getTask = projectTasks.find(task => task.id === taskId);
    setTask(getTask);
  }, [projectTasks, taskId]);

  return (
    <section className={classes['task-view']}>
      <div className={classes['task-container']}>
        <h1>{`< Back`}</h1>
        <div
          className={`${classes.task} ${
            task.status === 'completed' ? classes.completed : ''
          } ${task.status === 'inprogress' ? classes.inprogress : ''}`}
        >
          <h1>{task.title}</h1>
          <p className={classes.createdby}>
            Created by {task.createdBy} on July 2, 2022
          </p>
          <p>{task.details}</p>
          <div className={classes.checklist}>
            <ul>
              {task.checklist &&
                task.checklist.map(item => (
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
          <div className={classes.tags}>
            <ul>
              {task.tags &&
                task.tags.map((tag, index) => (
                  <li key={`tag-${index + 1}`}>{tag}</li>
                ))}
            </ul>
            <p>Add Tags +</p>
          </div>
          <div className={classes.footer}>
            <p>Updated by Rasamune 9 minutes ago</p>
          </div>
        </div>
      </div>
      <div className={classes['comments-container']}>
        <h1>Comments</h1>
        <div className={classes.addcomment}>
          <p>Add Comment +</p>
        </div>
        <div className={classes.comments}>
          <ul>
            {task.comments &&
              task.comments.map(comment => (
                <li key={comment.id} className={classes.bubble}>
                  <div className={classes.info}>
                    <p className={classes.createdby}>{comment.createdBy}</p>
                    <p className={classes.time}>July 2nd 2022, 11:43pm</p>
                  </div>
                  <div className={classes.comment}>
                    <p>{comment.comment}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TaskView;
