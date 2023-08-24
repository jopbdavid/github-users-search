import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { loading } = useContext(GithubContext);
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      {loading ? (
        <img src={loadingImage} alt="loading" className="loading-img" />
      ) : (
        <User />
      )}

      <Repos />
    </main>
  );
};

export default Dashboard;
