import { useRef } from "react";

export function EditorialVideo({
  video,
  thumbnail,
  className = "",
}) {
  const videoRef = useRef(null);

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
        muted
        loop
      />
    </div>
  );
}