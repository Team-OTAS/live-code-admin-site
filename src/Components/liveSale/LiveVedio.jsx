import React from "react";

const LiveVideoPlayer = ({ streamUrl }) => {
  return (
    <div className="live-video-player">
      <iframe
        title="live-video"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen="true"
        frameborder="0"
        height="768"
        scrolling="no"
        src="https://www.facebook.com/plugins/video.php?width=432&href=https%3A%2F%2Fwww.facebook.com%2F301594299590530%2Fvideos%2F1573637693421917"
        style={{ border: "none", overflow: "hidden" }}
        width="350"
      ></iframe>
    </div>
  );
};

export default LiveVideoPlayer;
