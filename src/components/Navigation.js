import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={classes.navigation}>
      <ul>
        <li>Overview</li>
        <li>Projects</li>
      </ul>
    </div>
  );
};

export default Navigation;
