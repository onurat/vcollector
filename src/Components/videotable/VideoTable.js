import React from "react";
import "./videoTable.css";
import "bootstrap/dist/css/bootstrap.min.css";

function convertWatchToEmbedLink(watchLink) {
  const watchPattern = /https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/;
  const match = watchLink.match(watchPattern);

  if (match && match.length === 2) {
    const videoId = match[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return embedLink;
  } else {
    return watchLink;
  }
}

const VideoTable = ({ videos, handleRemove }) => {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div className="video-card" key={video.id}>
          <h2>{video.title}</h2>
          <div className="video-container">
            <iframe
              title={video.title}
              src={
                video.url.startsWith("https://www.youtube.com/watch?v=")
                  ? convertWatchToEmbedLink(video.url)
                  : video.url
              }
              allowFullScreen
            />
          </div>
          <p>Uploaded: {video.uploadDate}</p>
          <button
            className="remove-button"
            onClick={() => handleRemove(video.id)}
          >
            Remove Video
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoTable;
