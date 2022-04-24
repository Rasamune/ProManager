import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './TaskView.module.css';

const TaskView = props => {
  const projectTasks = props.tasks;
  const { taskId } = useParams();
  const task = projectTasks.find(task => task.id === taskId);
  const [editFields, setEditFields] = useState({
    title: {
      editting: false,
      value: '',
    },
    details: {
      editting: false,
      value: '',
    },
  });
  const navigate = useNavigate();

  const checklistClickHandler = e => {
    props.onChecklistHandler(
      task,
      e.target.dataset.id,
      e.target.dataset.checked
    );
  };

  const backClickHandler = e => {
    navigate('/');
  };

  const onEditHandler = e => {
    const value = e.target.textContent;
    const type = e.target.dataset.type;
    setEditFields(prevState => ({
      ...prevState,
      [type]: {
        editting: true,
        value: value,
      },
    }));
  };

  const onFinishEditHandler = (value, type) => {
    setEditFields(prevState => ({
      ...prevState,
      [type]: {
        editting: false,
        value: value,
      },
    }));
    const updatedTask = {
      ...task,
      [type]: value,
    };

    props.onUpdateTask(updatedTask);
  };

  const onInputBlur = e => {
    const value = e.target.value;
    const type = e.target.dataset.type;
    onFinishEditHandler(value, type);
  };

  const onInputEnterKey = e => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      const type = e.target.dataset.type;
      onFinishEditHandler(value, type);
    }
  };

  return (
    <section className={classes['task-view']}>
      <div className={classes['task-container']}>
        <h1 onClick={backClickHandler}>{`< Back`}</h1>
        <div
          className={`${classes.task} ${
            task.status === 'completed' ? classes.completed : ''
          } ${task.status === 'inprogress' ? classes.inprogress : ''}`}
        >
          {editFields.title.editting && (
            <input
              autoFocus
              className={classes.title}
              type="text"
              defaultValue={editFields.title.value}
              onBlur={onInputBlur}
              onKeyDown={onInputEnterKey}
              data-type="title"
            />
          )}
          {!editFields.title.editting && (
            <h1 onClick={onEditHandler} data-type="title">
              {task.title}
            </h1>
          )}
          <p className={classes.createdby}>
            Created by {task.createdBy} on July 2, 2022
          </p>
          {editFields.details.editting && (
            <textarea
              autoFocus
              className={classes.details}
              defaultValue={editFields.details.value}
              onBlur={onInputBlur}
              onKeyDown={onInputEnterKey}
              data-type="details"
            />
          )}
          {!editFields.details.editting && (
            <p onClick={onEditHandler} data-type="details">
              {task.details}
            </p>
          )}
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
            <div className={`${classes.priority} ${classes[task.priority]}`}>
              {task.priority} priority
            </div>
            <p>Updated by {task.lastUpdatedBy} 9 minutes ago</p>
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
