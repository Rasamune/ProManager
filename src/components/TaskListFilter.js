import { useState } from 'react';
import useMobile from '../hooks/use-mobile';
import classes from './TaskListFilter.module.css';

const TaskListFilter = props => {
  const filters = props.filters;
  const [showFiltersMobile, setShowFiltersMobile] = useState('');
  const isMobileView = useMobile();
  const [dropdown, setDropdown] = useState({
    time: false,
    progress: false,
    priority: false,
    view: false,
  });

  const clickFilterHandler = e => {
    const type = e.target.closest('ul').id;
    const value = e.target.dataset.value;
    const name = e.target.textContent;
    props.onFilterChange(type, value, name);
    closeListHandler(type);
  };

  const toggleListHandler = type => {
    setDropdown(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const closeListHandler = type => {
    setDropdown(prevState => ({
      ...prevState,
      [type]: false,
    }));
  };

  const toggleVisiblityHandler = e => {
    if (showFiltersMobile === '') {
      e.target.textContent = 'Hide Sorting Filters';
      setShowFiltersMobile('show');
      return;
    }
    e.target.textContent = 'View Sorting Filters';
    setShowFiltersMobile('');
  };

  return (
    <>
      <section
        className={`${classes['task-filter-container']} ${
          showFiltersMobile === 'show' ? classes.show : ''
        }`}
      >
        <div className={classes.sort}>
          <label>Sort:</label>
          <div className={classes.filterwrapper}>
            <button
              className={`${classes.filterchoice} ${
                dropdown.time && classes.selected
              }`}
              onClick={() => toggleListHandler('time')}
              data-filter="time"
            ><span>{filters.time.name}</span></button>
            {dropdown.time && (
              <ul
                className={classes.filterlist}
                id="time" 
                /*onClick={clickFilterHandler}*/
                onMouseLeave={() => closeListHandler('time')}
              >
                <li><button type="button" data-value="new" onClick={clickFilterHandler}>Newest</button></li>
                <li><button type="button" data-value="update" onClick={clickFilterHandler}>Last Updated</button></li>
                <li><button type="button" data-value="dueDate" onClick={clickFilterHandler}>Due Date</button></li>
                <li><button type="button" data-value="old" onClick={clickFilterHandler}>Oldest</button></li>
              </ul>
            )}
          </div>
        </div>
        <div className={classes.sort}>
          <label>Progress:</label>
          <div className={classes.filterwrapper}>
            <button
              className={`${classes.filterchoice} ${dropdown.progress && classes.selected}`}
              onClick={() => toggleListHandler('progress')}
              data-filter="progress"
            >
              <span>{filters.progress.name}</span>
            </button>
            {dropdown.progress && (
              <ul
                className={classes.filterlist}
                id="progress"
                onMouseLeave={() => closeListHandler('progress')}
              >
                <li><button type="button" data-value="all" onClick={clickFilterHandler}>All Tasks</button></li>
                <li><button type="button" data-value="new" onClick={clickFilterHandler}>Not Started</button></li>
                <li><button type="button" data-value="inprogress" onClick={clickFilterHandler}>In Progress</button></li>
                <li><button type="button" data-value="completed" onClick={clickFilterHandler}>Completed</button></li>
              </ul>
            )}
          </div>
        </div>
        <div className={classes.sort}>
          <label>Priority:</label>
          <div className={classes.filterwrapper}>
            <button
              className={`${classes.filterchoice} ${dropdown.priority && classes.selected}`}
              onClick={() => toggleListHandler('priority')}
              data-filter="priority"
            >
              <span>{filters.priority.name}</span>
            </button>
            {dropdown.priority && (
              <ul
                className={classes.filterlist}
                id="priority"
                onMouseLeave={() => closeListHandler('priority')}
              >
                <li><button type="button" data-value="all" onClick={clickFilterHandler}>Any Priority</button></li>
                <li><button type="button" data-value="high" onClick={clickFilterHandler}>High</button></li>
                <li><button type="button" data-value="medium" onClick={clickFilterHandler}>Medium</button></li>
                <li><button type="button" data-value="low" onClick={clickFilterHandler}>Low</button></li>
              </ul>
            )}
          </div>
        </div>
        <div className={classes.sort}>
          <label>View:</label>
          <div className={classes.filterwrapper}>
            <button
              className={`${classes.filterchoice} ${dropdown.view && classes.selected}`}
              onClick={() => toggleListHandler('view')}
              data-filter="view"
            >
              <span>{filters.view.name}</span>
            </button>
            {dropdown.view && (
              <ul
                className={classes.filterlist}
                id="view"
                onMouseLeave={() => closeListHandler('view')}
              >
                <li><button type="button" data-value="expand" onClick={clickFilterHandler}>Expanded</button></li>
                <li><button type="button" data-value="minimize" onClick={clickFilterHandler}>Minimized</button></li>
              </ul>
            )}
          </div>
        </div>
      </section>
      {isMobileView && (
        <button
          className={classes['view-filters']}
          onClick={toggleVisiblityHandler}
        >
          View Sorting Filters
        </button>
      )}
    </>
  );
};

export default TaskListFilter;
