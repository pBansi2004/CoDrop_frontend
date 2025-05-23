import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RepoDetail.css";
import Navbar from "../navbar.jsx";
import "./UpdateRepo.css";


const UpdateRepo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://52.66.237.40:3000/repo/${id}`);
        const repo = res.data[0];
        setDescription(repo.description || "");
      } catch (err) {
        console.error("Error loading repository:", err);
      }
    };
    fetchRepo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://52.66.237.40:3000/repo/update/${id}`, {
        description,
        content: newContent,
      });
      alert("Repository updated!");
      navigate(`/repo/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="update-repo-container">
        <h2>Edit Repository</h2>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>New Content</label>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
        <button onClick={handleUpdate} className="update-btn">Update</button>
      </div>
    </>
  );
};

export default UpdateRepo;
