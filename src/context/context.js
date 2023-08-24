import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  // Error
  const [error, setError] = useState({ show: false, msg: "" });

  // Search User
  const searchGithubUser = async (user) => {
    try {
      setLoading(true);
      setError({ show: false, msg: "" });
      const response = await axios.get(`${rootUrl}/users/${user}`);
      console.log(response);
      if (response.data.name === null || response.status === "404") {
        setError({ show: true, msg: "No user with that username" });
        setLoading(false);
        return;
      }
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      const [newRepos, newFollowers] = await Promise.allSettled([
        axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios.get(`${followers_url}?per_page=100`),
      ]);

      if (newRepos.status === "fulfilled") {
        setRepos(newRepos.value.data);
      }
      if (newFollowers.status === "fulfilled") {
        setFollowers(newFollowers.value.data);
      }

      setLoading(false);
    } catch (error) {
      setError({ show: true, msg: "No user with that username" });
      setLoading(false);
    }
  };

  // Check requests
  const checkRequests = async (url) => {
    try {
      const response = await axios.get(`${url}/rate_limit`);
      let { remaining } = response.data.rate;

      if (remaining === 0) {
        setError({
          show: true,
          msg: "Sorry, you have exceeded your hourly request rate",
        });
      }
      setRequests(remaining);
    } catch (error) {
      setError({ show: true, msg: error });
    }
  };

  useEffect(() => {
    console.log("App loaded");
    checkRequests(rootUrl);
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
