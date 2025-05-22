import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateRepo.css";
import Navbar from "../navbar.jsx";

const CreateRepo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [content, setContent] = useState([""]); // Start with one content input
  const navigate = useNavigate();

  const handleContentChange = (index, value) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  const addContentItem = () => {
    setContent([...content, ""]);
  };

  const removeContentItem = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = localStorage.getItem("userId");
    if (!owner) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/repo/create", {
        name,
        description,
        visibility,
        owner,
        issues: [],
        content: content.filter((item) => item.trim() !== ""), // Remove empty entries
      });

      alert("Repository created successfully!");
      navigate(`/repo/${response.data.repositoryID}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error creating repository");
    }
  };

  return (
    <>
      <Navbar />
    <div className="create-repo-container">
      <form onSubmit={handleSubmit} className="create-repo-form">
        <h2>Create New Repository</h2>

        <label>
          <span>Repository Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter repository name"
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your repository (optional)"
          />
        </label>

        <div className="visibility-group">
          <span>Visibility:</span>
          <div className="visibility-options">
            <label className={`visibility-option ${visibility ? "active" : ""}`}>
              <input
                type="radio"
                name="visibility"
                value="true"
                checked={visibility === true}
                onChange={() => setVisibility(true)}
              />
              <span>🌐 Public</span>
            </label>
            <label className={`visibility-option ${!visibility ? "active" : ""}`}>
              <input
                type="radio"
                name="visibility"
                value="false"
                checked={visibility === false}
                onChange={() => setVisibility(false)}
              />
              <span>🔒 Private</span>
            </label>
          </div>
        </div>

        <div className="content-group">
          <span>Content</span>
          {content.map((item, idx) => (
            <div key={idx} className="content-item">
              <input
                type="text"
                value={item}
                onChange={(e) => handleContentChange(idx, e.target.value)}
                placeholder="Enter content item"
              />
              {content.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContentItem(idx)}
                  className="remove-content-btn"
                  aria-label={`Remove content item ${idx + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addContentItem}
            className="add-content-btn"
            aria-label="Add content item"
          >
            + Add Content
          </button>
        </div>

        <button type="submit" className="submit-btn">
          Create Repository
        </button>
      </form>
    </div>
    </>
  );
};

export default CreateRepo;
