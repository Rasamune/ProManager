import { useState, useRef } from 'react';
import { useTimestamp } from '../hooks/use-timestamp';
import classes from './CommentsView.module.css';

const CommentsView = props => {
  const task = props.task;
  const timestamp = useTimestamp;
  const commentRef = useRef();
  const [addingComment, setAddingComment] = useState(false);

  const showCommentHandler = e => {
    setAddingComment(!addingComment);
  };

  const addCommentHandler = e => {
    const comment = commentRef.current.value;

    if (!comment || comment === '') {
      setAddingComment(false);
      return;
    }

    const newId = `comment${Date.now()}`;
    const updatedTask = {
      ...task,
      comments: [
        {
          id: newId,
          createdBy: 'Guest',
          datePosted: new Date(),
          comment: comment,
        },
        ...task.comments,
      ],
    };
    setAddingComment(false);
    props.onAddComment(updatedTask);
  };

  const keyDownHandler = e => {
    if (e.key === 'Enter') {
      addCommentHandler();
    }
  };

  return (
    <div className={classes['comments-container']}>
      <h1>Comments</h1>
      {addingComment && (
        <>
          <textarea
            autoFocus
            className={classes.details}
            defaultValue={''}
            data-type="details"
            ref={commentRef}
            onKeyDown={keyDownHandler}
          />
          <div className={classes.postcomment}>
            <button className={classes.cancel} onClick={showCommentHandler}>
              Cancel
            </button>
            <button className={classes.post} onClick={addCommentHandler}>
              Add
            </button>
          </div>
        </>
      )}
      {!addingComment && (
        <div className={classes.addcomment} onClick={showCommentHandler}>
          <p>Add Comment +</p>
        </div>
      )}

      <div className={classes.comments}>
        <ul>
          {task.comments &&
            task.comments.map(comment => (
              <li key={comment.id} className={classes.bubble}>
                <div className={classes.info}>
                  <p className={classes.createdby}>{comment.createdBy}</p>
                  <p className={classes.time}>
                    {timestamp(comment.datePosted)}
                  </p>
                </div>
                <div className={classes.comment}>
                  <p>{comment.comment}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default CommentsView;
