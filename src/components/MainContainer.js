import classes from './MainContainer.module.css';

const MainContainer = props => {
  return <main className={classes.main}>{props.children}</main>;
};

export default MainContainer;
