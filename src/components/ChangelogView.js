import { useTimestamp, useDateFormat } from '../hooks/use-timestamp';
import classes from './ChangelogView.module.css';

const ChangelogView = props => {
  const timestamp = useTimestamp;
  const formatDate = useDateFormat;
  const task = props.task;

  const changelog = task.changelog.map((item, index) => {
    let action = `updated ${item.type} to`;
    let listItemChangeDetails = '';
    let itemDetails = item.details;
    if (item.type === 'details') action = `updated description to`;
    if (item.type === 'priority') action = `changed ${item.type} to`;
    if (item.type === 'tags') action = `changed ${item.type} to`;
    if (item.type === 'itemCompleted') action = 'completed';
    if (item.type === 'itemUnchecked') action = 'unchecked';
    if (item.type === 'taskAdd') {
      action = `added `;
      listItemChangeDetails = 'to task list';
    }
    if (item.type === 'taskRemove') {
      action = `removed `;
      listItemChangeDetails = 'from task list';
    }
    if (item.type === 'dueDate') {
      action = `updated due date to`;
      itemDetails = formatDate(item.details);
    }
    return (
      <li key={`change${index}`}>
        {item.changeBy} {action} <span>"{itemDetails}"</span>{' '}
        {listItemChangeDetails} - {timestamp(item.date)}
      </li>
    );
  });

  return (
    <section className={classes['changelog-container']}>
      <h1>History</h1>
      <ul>{changelog}</ul>
    </section>
  );
};

export default ChangelogView;
