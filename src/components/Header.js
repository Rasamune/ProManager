import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../img/ProManagerLogo.svg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <div className={classes.title}>
          <Link to="/">
            <Logo className={classes.logo} />
            ProManager
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
