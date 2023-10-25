import "./styles.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="header__title">HRnet</div>
      <nav>
        <ul>
          <li>
            <a href="#">Create Employee</a>
          </li>
          <li>
            <a href="#">View Current Employees</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
