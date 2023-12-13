import React, { useState, useEffect } from 'react';
import './App.css';
import AddVideo from "./Components/addvideo/AddVideo"
import axios from 'axios';
import VideoTable from "./Components/videotable/VideoTable"
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleRemove = async (videoId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/${videoId}`);
      if (response.status === 200) {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      } else {
        console.error('Error removing video:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app-container">
      <Navbar />
      <AddVideo handleAddVideo={handleAdd} />
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="video-list">
        <VideoTable videos={videos} handleRemove={handleRemove} searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
}

export default App;