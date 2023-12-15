import "./styles.scss";
import Table from "easy-react-table-component/dist/Table";

function EmployeesList() {
  return (
    <main className="employees-page">
      <h2>Current Employees</h2>
      {/* <DatePicker /> */}
      <Table />
    </main>
  );
}
export default EmployeesList;
