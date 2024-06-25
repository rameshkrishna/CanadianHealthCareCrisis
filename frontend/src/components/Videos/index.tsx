import React from "react"; // Ensure React is imported if using JSX
import Video from "next-video"; // Assuming Video is a default export
import fraser from "/videos/fraser.mp4";

const FraserVideo = () => {
  return <Video src={fraser} />;
};

export default FraserVideo;
