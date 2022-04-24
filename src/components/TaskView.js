import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './TaskView.module.css';

const TaskView = props => {
  const navigate = useNavigate();
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
    checklist: {
      editting: false,
      value: [],
    },
    tags: {
      editting: false,
      value: [],
    },
  });

  const checklistClickHandler = e => {
    let checked;
    e.target.dataset.checked === 'true' ? (checked = false) : (checked = true);
    props.onChecklistHandler(task, e.target.dataset.id, checked);
  };

  const backClickHandler = e => {
    navigate('/');
  };

  const editInputHandler = e => {
    let value = e.target.textContent;
    const type = e.target.dataset.type;

    if (type === 'checklist') value = [];
    if (type === 'tags') value = task.tags.join(' ');

    setEditFields(prevState => ({
      ...prevState,
      [type]: {
        editting: true,
        value: value,
      },
    }));
  };

  const finishEdittingInputHandler = (value, type) => {
    // If values are empty, cancel editting
    if (
      value === '' ||
      value.length === 0 ||
      value === editFields[type].value
    ) {
      setEditFields(prevState => ({
        ...prevState,
        [type]: {
          editting: false,
        },
      }));
      return;
    }
    // If checklist update value input
    if (type === 'checklist') {
      if (task.checklist.length > 0) {
        const newId = `check${
          +task.checklist[task.checklist.length - 1].id.slice(-1) + 1
        }`;
        value = [
          ...task.checklist,
          {
            id: newId,
            title: value,
            completed: false,
          },
        ];
      } else {
        value = [
          {
            id: 'check1',
            title: value,
            completed: false,
          },
        ];
      }
    }
    // If tags update value input
    if (type === 'tags') {
      value = value
        .replaceAll(',', ' ') // Remove separation by comma
        .replaceAll('/', ' ') // Remove separation by /
        .replace(/\s+/g, ' ') // Remove all extra whitespace
        .split(' ')
        .reduce((prevArray, curString) => {
          return prevArray.includes(curString)
            ? prevArray
            : [...prevArray, curString];
        }, []);
    }
    setEditFields(prevState => ({
      ...prevState,
      [type]: {
        editting: false,
        value: null,
      },
    }));
    const updatedTask = {
      ...task,
      [type]: value,
    };

    props.onUpdateTask(updatedTask);
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

  const removeItemHandler = e => {
    const updatedTask = { ...task };
    const itemIndex = updatedTask.checklist.findIndex(
      item => item.id === e.target.dataset.id
    );
    updatedTask.checklist.splice(itemIndex, 1);

    setEditFields(prevState => ({
      ...prevState,
      checklist: {
        editting: false,
        value: null,
      },
    }));

    props.onUpdateTask(updatedTask);
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
              onBlur={inputBlurHandler}
              onKeyDown={inputEnterKeyHandler}
              data-type="title"
            />
          )}
          {!editFields.title.editting && (
            <h1 onClick={editInputHandler} data-type="title">
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
              onBlur={inputBlurHandler}
              onKeyDown={inputEnterKeyHandler}
              data-type="details"
            />
          )}
          {!editFields.details.editting && (
            <p onClick={editInputHandler} data-type="details">
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
                    <span
                      data-id={item.id}
                      className={classes.remove}
                      onClick={removeItemHandler}
                    >
                      x
                    </span>
                  </li>
                ))}
              {editFields.checklist.editting && (
                <li key="adding-item">
                  <input
                    autoFocus
                    className={classes.addingitem}
                    type="text"
                    defaultValue={editFields.title.value}
                    onBlur={inputBlurHandler}
                    onKeyDown={inputEnterKeyHandler}
                    data-type="checklist"
                  />
                </li>
              )}
              {!editFields.checklist.editting && (
                <li
                  key="add-item"
                  className={classes.addtask}
                  data-type="checklist"
                  onClick={editInputHandler}
                >
                  + Add Item
                </li>
              )}
              {task.checklist.length === 0 && (
                <li className={classes.itemwarning}>
                  * Add Item to start tracking progress
                </li>
              )}
            </ul>
          </div>
          <div className={classes.tags}>
            {editFields.tags.editting && (
              <input
                autoFocus
                className={classes.addingtag}
                type="text"
                defaultValue={editFields.tags.value}
                onBlur={inputBlurHandler}
                onKeyDown={inputEnterKeyHandler}
                data-type="tags"
              />
            )}
            {!editFields.tags.editting && (
              <>
                <ul>
                  {task.tags &&
                    task.tags.map((tag, index) => (
                      <li key={`tag-${index + 1}`}>{tag}</li>
                    ))}
                  <li
                    key="add-tag"
                    className={classes.addtag}
                    onClick={editInputHandler}
                    data-type="tags"
                  >
                    Add Tags +
                  </li>
                </ul>
              </>
            )}
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
