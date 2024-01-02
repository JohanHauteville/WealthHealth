import "./styles.scss";
import Table from "easy-react-table-component/dist/Table";
import { useSelector } from "react-redux";
import { LIST_TO_DISPLAY } from "../../utils/constants";

function EmployeesList() {
  const { employees } = useSelector((state) => state.listOfEmployees);
  return (
    <main className="employees-page">
      <h2>Current Employees</h2>
      <div className="table-container">
        <Table data={employees} listToDisplay={LIST_TO_DISPLAY} />
      </div>
    </main>
  );
}
export default EmployeesList;
