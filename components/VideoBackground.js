import React from "react";

function VideoBackground() {
  return (
    <div className="relative w-full h-48 lg:h-[30rem] overflow-hidden bg-black bg-opacity-80">
      <video
        autoPlay
        loop
        muted
        width="100%"
        height="80%"
        src="videos/bgcover.webm"
        type="video/mp4"
      />
    </div>
  );
}

export default VideoBackground;
