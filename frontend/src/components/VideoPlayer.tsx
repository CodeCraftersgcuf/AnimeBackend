// components/VideoPlayer.tsx
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video) {
      video.src = src;
    }
  }, [src]);

  return (
    <div className="w-full">
      <video ref={videoRef} controls className="w-full rounded-lg shadow-lg" />
    </div>
  );
};

export default VideoPlayer;
