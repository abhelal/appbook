import React from "react";

function VideoBackground() {
  return (
    <div className="relative w-full h-48 lg:h-[30rem] overflow-hidden bg-black bg-opacity-80">
      <div
        dangerouslySetInnerHTML={{
          __html: `
      <video
        autoPlay
        loop
        muted
        playsinline
        width="100%"
        height="80%"
        src="videos/bgcover.mp4"
        type="video/mp4"
        className="absolute"
      /> `,
        }}
      />
    </div>
  );
}

export default VideoBackground;
