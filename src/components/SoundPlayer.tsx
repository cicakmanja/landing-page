import React, { useEffect, useRef, useState } from "react";

const SoundPlayer = () => {
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = new Audio("/bg.mp3"); // Replace with your sound file path
    audioRef.current = audio;
    audio.play();
    setIsPlaying(true);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-10 right-5 z-50">
      <button
        onClick={togglePlay}
        className="flex items-center p-4 bg-white text-black rounded-full focus:outline-none"
      >
        {isPlaying ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default SoundPlayer;
