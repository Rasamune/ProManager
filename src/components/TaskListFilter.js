import { useState } from 'react';
import useMobile from '../hooks/use-mobile';
import classes from './TaskListFilter.module.css';

const TaskListFilter = props => {
  const filters = props.filters;
  const [showFiltersMobile, setShowFiltersMobile] = useState('');
  const isMobileView = useMobile();
  const [dropdown, setDropdown] = useState({
    sort: false,
    progress: false,
    priority: false,
    view: false,
  });

  const clickFilterHandler = e => {
    const type = e.target.parentElement.id;
    const value = e.target.dataset.value;
    const name = e.target.textContent;
    props.onFilterChange(type, value, name);
  };

  const toggleListHandler = e => {
    const type = e.target.closest('div').dataset.filter;

    setDropdown(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const closeListHandler = e => {
    const type = e.target.closest('div').dataset.filter;
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
          <div
            className={`${classes.filterchoice} ${
              dropdown.sort && classes.selected
            }`}
            onClick={toggleListHandler}
            onMouseLeave={closeListHandler}
            data-filter="sort"
          >
            <span>{filters.time.name}</span>
            {dropdown.sort && (
              <ul
                className={classes.filterlist}
                id="time"
                onClick={clickFilterHandler}
              >
                <li data-value="new">Newest</li>
                <li data-value="update">Last Updated</li>
                <li data-value="dueDate">Due Date</li>
                <li data-value="old">Oldest</li>
              </ul>
            )}
          </div>
        </div>
        <div className={classes.sort}>
          <label>Progress:</label>
          <div
            className={`${classes.filterchoice} ${
              dropdown.progress && classes.selected
            }`}
            onClick={toggleListHandler}
            onMouseLeave={closeListHandler}
            data-filter="progress"
          >
            <span>{filters.progress.name}</span>
            {dropdown.progress && (
              <ul
                className={classes.filterlist}
                id="progress"
                onClick={clickFilterHandler}
              >
                <li data-value="all">All Tasks</li>
                <li data-value="new">Not Started</li>
                <li data-value="inprogress">In Progress</li>
                <li data-value="completed">Completed</li>
              </ul>
            )}
          </div>
        </div>
        <div className={classes.sort}>
          <label>Priority:</label>
          <div
            className={`${classes.filterchoice} ${
              dropdown.priority && classes.selected
            }`}
            onClick={toggleListHandler}
            onMouseLeave={closeListHandler}
            data-filter="priority"
          >
            <span>{filters.priority.name}</span>
            {dropdown.priority && (
              <ul
                className={classes.filterlist}
                id="priority"
                onClick={clickFilterHandler}
              >
                <li data-value="all">Any Priority</li>
                <li data-value="high">High</li>
                <li data-value="medium">Medium</li>
                <li data-value="low">Low</li>
              </ul>
            )}
          </div>
        </div>
        <div className={classes.sort}>
          <label>View:</label>
          <div
            className={`${classes.filterchoice} ${
              dropdown.view && classes.selected
            }`}
            onClick={toggleListHandler}
            onMouseLeave={closeListHandler}
            data-filter="view"
          >
            <span>{filters.view.name}</span>
            {dropdown.view && (
              <ul
                className={classes.filterlist}
                id="view"
                onClick={clickFilterHandler}
              >
                <li data-value="expand">Expanded</li>
                <li data-value="minimize">Minimized</li>
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
