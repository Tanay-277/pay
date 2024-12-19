import AppBar from "@/components/AppBar";
import DashHeader from "@/components/DashHeader";
import Users from "@/components/Users";

const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <section className="flex px-8 py-4 flex-col gap-6">
        <DashHeader />
        <Users />
      </section>
    </div >
  );
};

export default Dashboard;
