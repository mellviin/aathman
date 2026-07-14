import { memo, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { imageReveal, viewportSettings } from '../../utils/animationVariants'

function EditorialVideoCard({ item, className = '' }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const isInView = useInView(containerRef, {
    amount: 0.5, // 50% visible
  })

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    if (isInView) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView])

  return (
    <motion.article
      ref={containerRef}
      initial="initial"
      whileInView="animate"
      viewport={viewportSettings}
      variants={imageReveal}
      className={`video-card group relative overflow-hidden border border-[#b7a07f20] bg-[#faf4ec]/20 shadow-[0_20px_80px_rgba(15,11,8,0.08)] ${className}`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src={item.video} type="video/mp4" />
      </video>

      {/* Top meta */}
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[10px] tracking-[0.18em] text-[#f3ebde] md:left-5 md:right-5 md:top-5">
        <p>{item.location}</p>
        <p>{item.runtime}</p>
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
        <p className="text-[10px] tracking-[0.26em] text-[#e8dcc8] uppercase">
          {item.year}
        </p>

        <h4 className="mt-1 text-2xl text-[#f8efe0] md:text-3xl">
          {item.title}
        </h4>

        <p className="mt-1 text-xs text-[#f0e5d5]">
          {item.couple}
        </p>

        <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#eadfce]">
          {item.phrase}
        </p>
      </div>
    </motion.article>
  )
}

export default memo(EditorialVideoCard)