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
            let newData = videos.filter((video) => video.id !== data.id)
            setVideos(newData);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

};
const increaseRating = (id) => {
    let newData = [];
    newData = videos.map((video) => 
    video.id === id ? { ...video, rating: video.rating + 1 }: video);
return setVideos(newData);
}
const decreaseRating = (id) => {
    let newData = [];
    newData = videos.map((video) => 
    video.id === id ? {...video, rating: video.rating - 1}: video);
return setVideos(newData);
}; 

const Card =(video) => {
  return (
    <div className='cardContainer' key={video.id}>
        <iframe
         height="315" 
         src={video.url.replace("watch?v=", "embed/")}
         title={video.title} 
         frameborder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
        </iframe>

        <h6>{video.title}</h6>
        <span className='UpDownVote'>
            <i className='fa fa-thumbs-up' onClick={() => increaseRating(video.id)}></i>
            {video.rating}
            <i className='fa fa-thumbs-down' onClick={() => decreaseRating(video.id)}></i>
        </span>

        <button className='deleteButton' onClick={() => handleDeleteClick(video.id)}>
            Delete Video
        </button>
    </div>
  );
};

return (
    <div className="allCardsContainer">
       {videos.map((video) => Card(video))}
     </div>
  );

}
export default VideoCards;