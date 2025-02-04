import React from 'react'
import "./VideoCards.css";

const VideoCards = ({ videos, setVideos }) => {
    const handleDeleteClick = (id) => {
        fetch(`http://localhost:5000/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log("deleted", data)
            let newData = videos.filter((video) => video.id !== id);
            setVideos(newData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const updateRating = (id, increment) => {
    const updatedVideos = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating + increment } : video
    );
  
    fetch(`http://localhost:5000/rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, increment }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Rating updated:", data);
        setVideos(updatedVideos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const increaseRating = (id) => {
    updateRating(id, 1);
  };
  const decreaseRating = (id) => {
    updateRating(id, -1);
  };
  
const Card = ({ video }) => {
  return (
    <div className='cardContainer' key={video.id}>
       {video.url &&(
        <iframe
         height="315" 
         src={video.url.replace("watch?v=", "embed/")}
         title={video.title} 
         frameBorder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
        </iframe>
)}

        <h2>{video.title}</h2>
        <span className='UpDownVote'>
            <i className='fa fa-thumbs-up' onClick={() => increaseRating(video.id)}>👍</i>
            {video.rating}
            <i className='fa fa-thumbs-down' onClick={() => decreaseRating(video.id)}>👎</i>
        </span>

        <button className='deleteButton' onClick={() => handleDeleteClick(video.id)}>
            Delete Video
        </button>
    </div>
  );
};

return(
        <div className="allCardsContainer"> 
           {videos 
          .filter((video) => video.url)
          .map((video) => (
            <Card key={video.id} video={video} /> 
          ))}
        </div>
  );
};
export default VideoCards;