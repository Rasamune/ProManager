import classes from './TaskListFilter.module.css';

const TaskListFilter = props => {
  const filters = props.filters;

  const clickHandler = e => {
    const type = e.target.parentElement.id;
    const value = e.target.dataset.value;
    const name = e.target.textContent;
    props.onFilterChange(type, value, name);
  };

  return (
    <section className={classes['task-filter-container']}>
      <div className={classes.sort}>
        <label>Sort:</label>
        <div className={classes.filterchoice}>
          <span>{filters.time.name}</span>
          <ul className={classes.filterlist} id="time" onClick={clickHandler}>
            <li data-value="new">Newest</li>
            <li data-value="update">Last Updated</li>
            <li data-value="dueDate">Due Date</li>
            <li data-value="old">Oldest</li>
          </ul>
        </div>
      </div>
      <div className={classes.sort}>
        <label>Progress:</label>
        <div className={classes.filterchoice}>
          <span>{filters.progress.name}</span>
          <ul
            className={classes.filterlist}
            id="progress"
            onClick={clickHandler}
          >
            <li data-value="all">All Tasks</li>
            <li data-value="new">Not Started</li>
            <li data-value="inprogress">In Progress</li>
            <li data-value="completed">Completed</li>
          </ul>
        </div>
      </div>
      <div className={classes.sort}>
        <label>Priority:</label>
        <div className={classes.filterchoice}>
          <span>{filters.priority.name}</span>
          <ul
            className={classes.filterlist}
            id="priority"
            onClick={clickHandler}
          >
            <li data-value="all">Any Priority</li>
            <li data-value="high">High</li>
            <li data-value="medium">Medium</li>
            <li data-value="low">Low</li>
          </ul>
        </div>
      </div>
      <div className={classes.sort}>
        <label>View:</label>
        <div className={classes.filterchoice}>
          <span>{filters.view.name}</span>
          <ul className={classes.filterlist} id="view" onClick={clickHandler}>
            <li data-value="expand">Expanded</li>
            <li data-value="minimize">Minimized</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TaskListFilter;
