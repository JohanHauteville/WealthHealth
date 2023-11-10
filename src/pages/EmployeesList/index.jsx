import "./styles.scss";
import DatePicker from "../../components/DatePicker";

function EmployeesList() {
  return (
    <main className="employees-page">
      <h2>Current Employees</h2>
      <DatePicker />
    </main>
  );
}
export default EmployeesList;
