import React, { useState } from 'react';
import './AddVideo.css';

function AddVideo({ handleAddVideo }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || !isValidUrl(url)) {
      return;
    }

    try {
      const response = await fetch('https://video-collector-api.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url }),
      });

      if (response.ok) {
        setTitle('');
        setUrl('');
        window.location.reload();
      } else {
        console.error('Error adding video:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'url') {
      setUrl(value);
    }
  };

  return (
    <div className="add-video-container">
      <h2>Add a Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            className="form-control"
            type="text"
            name="url"
            value={url}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn" type="submit">
          Add Video
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
