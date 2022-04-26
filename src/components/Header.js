import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <div className={classes.title}>
          <Link to="/">ProManager</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
