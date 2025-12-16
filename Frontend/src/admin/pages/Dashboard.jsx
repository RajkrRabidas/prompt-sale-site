import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Orders from "./Orders";

const AdminDashboard = () => {

  return (
    <div className="p-6">
      <Header />
      <div className="mt-6">
        <h2 className="text-lg font-medium">Dashboard Overview</h2>
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminDashboard;
