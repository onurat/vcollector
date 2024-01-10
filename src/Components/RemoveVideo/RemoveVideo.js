import React, { useState } from 'react';
import './RemoveVideo.css';

function RemoveVideo({ handleRemoveVideo }) {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim() === "") {
      return;
    }
    handleRemoveVideo(id.trim());
    setId("");
  };

  return (
    <div className="remove-video-container">
      <h2>Remove a Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            className="form-control"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Remove Video
        </button>
      </form>
    </div>
  );
}

export default RemoveVideo;
