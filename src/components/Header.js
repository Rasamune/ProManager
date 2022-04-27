import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <div className={classes.title}>
          <Link to="/">ProManager</Link>
        </div>
        {/* <div className={classes.nav}>
          <ul>
            <li>
              <NavLink
                className={navData => (navData.isActive ? classes.active : '')}
                to="/"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout/">Logout</NavLink>
            </li>
          </ul>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
