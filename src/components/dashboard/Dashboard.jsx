import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../navbar";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `52.66.237.40:3000/repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repositories);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://52.66.237.40:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
    <Navbar />
    <section id="dashboard">
      <aside className="dashboard-left">
        <h3 className="section-title">Suggested Repositories</h3>
        <div className="repo-list">
          {suggestedRepositories.map((repo) => (
           <Link to={`/repo/${repo._id}`} className="repo-card" key={repo._id}>
           <h4 className="repo-name">{repo.name}</h4>
           <p className="repo-description">{repo.description}</p>
         </Link>
         
          ))}
        </div>
      </aside>

      <main className="dashboard-center">
        <h2 className="section-title">Your Repositories</h2>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="repo-list">
          {searchResults.map((repo) => (
           <Link to={`/repo/${repo._id}`} className="repo-card" key={repo._id}>
           <h4 className="repo-name">{repo.name}</h4>
           <p className="repo-description">{repo.description}</p>
         </Link>
         
          ))}
        </div>
      </main>

      <aside className="dashboard-right">
        <h3 className="section-title">Upcoming Events</h3>
        <ul className="events-list">
          <li className="event-item">
            <p>Tech Conference - Dec 15</p>
          </li>
          <li className="event-item">
            <p>Developer Meetup - Dec 25</p>
          </li>
          <li className="event-item">
            <p>React Summit - Jan 5</p>
          </li>
        </ul>
      </aside>
    </section>
    </>
  );
};

export default Dashboard;
