import React, { useEffect, useState } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./RepoDetail.css";
import Navbar from "../navbar.jsx";

const RepoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState(null);
  const [error, setError] = useState("");

  const fetchRepo = async () => {
    try {
      const response = await axios.get(`http://52.66.237.40:3000/repo/${id}`);
      setRepository(response.data[0]);
    } catch (err) {
      setError("Failed to fetch repository.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRepo();
  }, [id]);

  const toggleVisibility = async () => {
    try {
      await axios.patch(`52.66.237.40/repo/toggle/${id}`);
      fetchRepo(); // Refresh
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  const deleteRepo = async () => {
    try {
      await axios.delete(`http://52.66.237.40:3000/repo/delete/${id}`);
      alert("Repository deleted!");
      navigate("/");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!repository) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="repo-detail-container">
        <div className="repo-header">
          <div className="repository-name">{repository.name}</div>
          <div className="repo-visibility">
            {repository.visibility ? "Public" : "Private"}
            <button className="toggle-btn" onClick={toggleVisibility}>
              Toggle
            </button>
          </div>
        </div>
        <div className="repo-owner">
          <h3>Owned by:</h3>
        <Link to={`/userProfile/${repository.owner?._id}`} className="owner-link">
            {repository.owner?.username}
          </Link> 
        </div>

        <div className="repo-description">
          <h3>Description</h3>
          {repository.description || "No description."}
        </div>

        <div className="repo-section">
          <h3>Content</h3>
          {repository.content?.length ? (
            repository.content.map((item, idx) => (
              <div key={idx} className="repo-content-box">
                {item}
              </div>
            ))
          ) : (
            <p className="repo-empty-state">No content available.</p>
          )}
        </div>

        <div className="repo-section">
          <h3>Issues</h3>
          {repository.issues?.length ? (
            repository.issues.map((issue, idx) => (
              <div key={idx} className="repo-content-box">
                {issue.title}
              </div>
            ))
          ) : (
            <p className="repo-empty-state">No issues found.</p>
          )}
        </div>

        <div className="repo-actions">
          <button onClick={() => navigate(`/repo/update/${repository._id}`)}>
            Edit
          </button>
          <button className="delete-button" onClick={deleteRepo}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default RepoDetail;
