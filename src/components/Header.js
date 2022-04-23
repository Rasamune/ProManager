import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <div className={classes.title}>ProManager</div>
      </div>
    </header>
  );
};

export default Header;
