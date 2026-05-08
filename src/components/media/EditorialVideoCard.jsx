import { memo } from 'react'
import { OptimizedImage } from './OptimizedImage'

function EditorialVideoCard({ item, activeVideoId, setActiveVideoId, className = '' }) {
  const isActive = activeVideoId === item.id

  return (
    <article className={`video-card group relative overflow-hidden border border-[#b7a07f20] bg-[#faf4ec]/20 shadow-[0_20px_80px_rgba(15,11,8,0.08)] transition-transform duration-300 ${className}`}>
      {isActive ? (
        <video autoPlay muted loop playsInline preload="metadata" poster={item.image} className="h-full w-full object-cover">
          <source src={item.video} type="video/mp4" />
        </video>
      ) : (
        <OptimizedImage
          src={item.image}
          alt={`${item.title} editorial film poster`}
          className="h-full w-full"
          overlay={false}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#11111150]" />
      <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[10px] tracking-[0.18em] text-[#f3ebde] md:left-5 md:right-5 md:top-5">
        <p className="font-[CoreSansD] uppercase tracking-[0.32em] text-[#f1e8d8]">{item.location}</p>
        <p className="font-[CoreSansD] uppercase tracking-[0.32em] text-[#f1e8d8]">{item.runtime}</p>
      </div>
      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
        <p className="text-[10px] tracking-[0.26em] text-[#e8dcc8] uppercase">{item.year}</p>
        <h4 className="mt-1 text-2xl font-[CoreSansD] text-[#f8efe0] md:text-3xl">{item.title}</h4>
        <p className="mt-1 text-xs text-[#f0e5d5]">{item.couple}</p>
        <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#eadfce]">{item.phrase}</p>
      </div>
      <button
        onClick={() => setActiveVideoId(isActive ? null : item.id)}
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#efe6d7b0] bg-[#1111113d] text-[#f6ede0] shadow-[0_16px_30px_rgba(0,0,0,0.18)] transition duration-300 hover:bg-[#11111160]"
        aria-label={isActive ? 'Pause film preview' : 'Play film preview'}
      >
        {isActive ? 'II' : '▶'}
      </button>
    </article>
  )
}

export default memo(EditorialVideoCard)
