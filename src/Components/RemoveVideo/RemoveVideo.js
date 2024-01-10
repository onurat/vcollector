import React, { useState } from 'react';
import './RemoveVideo.css';

function RemoveVideo({ handleRemoveVideo }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            return;
        }
        handleRemoveVideo(title.trim());
        setTitle("");
    };

    return (
        <div className="remove-video-container">
            <h2>Remove a Video</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
