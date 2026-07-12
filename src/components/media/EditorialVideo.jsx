import { useRef, useState } from "react";

export function EditorialVideo({
  video,
  thumbnail,
  className = "",
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video}
        poster={thumbnail}
        controls={playing}
        preload="metadata"
        playsInline
      />

      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/30"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md transition duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1 h-10 w-10"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}