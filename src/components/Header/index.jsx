import "./styles.scss";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../utils/constants";

function Header() {
  return (
    <header>
      <div className="header__title">
        <Link to={APP_ROUTES.CREATE_EMPLOYEE}>HRnet</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={APP_ROUTES.CREATE_EMPLOYEE}>Create Employee</Link>
          </li>
          <li>
            <Link to={APP_ROUTES.EMPLOYEES}>View Current Employees</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
