import { useRef, useState } from "react";

export function EditorialVideo({
  video,
  thumbnail,
  className = "",
  muted = true,
  showControls = false,
}) {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(muted);

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video}
        poster={thumbnail}
        preload="metadata"
        playsInline
        autoPlay
        muted={isMuted}
        loop
      />

      {showControls && (
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={toggleMute}
            className="
                flex h-12 w-12 items-center justify-center
                rounded-full
                border border-white/20
                bg-black/25
                backdrop-blur-xl
                text-white
                transition-all duration-500
                hover-scale-105
                hover:bg-black/40
                hover:border-white/40
              "
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      )}
    </div>
  );
}