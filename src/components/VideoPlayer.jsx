import React from 'react';
import YouTube from 'react-youtube';
import { track } from '@vercel/analytics';

const VideoPlayer = ({ videoId, title, onVideoEnd }) => {
  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center border border-white/10 shadow-2xl">
        <p className="text-gray-400 font-medium">Select a lesson to start watching</p>
      </div>
    );
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  const handlePlay = () => {
    track('video_play', { videoId, title });
  };

  const handleEnd = () => {
    track('video_complete', { videoId, title });
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl relative [&>div]:absolute [&>div]:inset-0 [&>div>iframe]:w-full [&>div>iframe]:h-full">
      <YouTube 
        videoId={videoId} 
        opts={opts} 
        onPlay={handlePlay}
        onEnd={handleEnd}
      />
    </div>
  );
};

export default VideoPlayer;

