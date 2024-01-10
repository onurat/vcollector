import React, { useState } from 'react';
import './RemoveVideo.css';

function RemoveVideo({ handleRemoveVideo }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            return;
        }

        try {
            const response = await fetch(`https://video-collector-api.onrender.com/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTitle("");
                setError(null);
                window.location.reload();
            } else {
                console.error('Error removing video:', response.statusText);
                setError('Failed to remove video');
            }
        } catch (error) {
            console.error('Error removing video:', error);
            setError('Failed to remove video');
        }
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
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default RemoveVideo;
