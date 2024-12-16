import { isLoggedIn } from "@/services/AuthService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { UserInterface } from "@/types/types";
import AppBar from "@/components/AppBar";
import Users from "@/components/Users";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [balance, setBalance] = useState<number>(0)
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { response, loggedIn, balance } = await isLoggedIn();
      setLoggedIn(loggedIn);
      if (!loggedIn) {
        navigate("/sign-in");
      } else if (response && balance) {
        setUserData(response.data.user);
        setBalance(balance)
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div>
      <AppBar userData={userData} />
      <section className="flex px-8 py-4 flex-col gap-6">
        <div className="flex md:items-center justify-between flex-col md:flex-row">
          <h1 className="greet text-3xl font-semibold">
            Hello {userData?.name.split(" ")[0]}
          </h1>
          <h1 className="greet md:text-3xl font-semibold text-muted-foreground">
            Balance : {balance.toFixed(2).toLocaleString()}
          </h1>
        </div>
        <Users balance={balance} />
      </section>
    </div>
  );
};

export default Dashboard;
