export function MandalaCorners({ className = '' }) {
  return (
    <div className={`mandala-corners pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`} aria-hidden="true">
      {/* Update public/mandala-corner.png with the uploaded PNG artwork */}
      <img
        src="/mandala-corner.png"
        alt=""
        className="absolute right-0 top-0 h-[24rem] w-auto opacity-[0.14] translate-x-1/4 -translate-y-1/4 sm:h-[26rem] md:h-[32rem]"
        style={{ mixBlendMode: 'soft-light' }}
      />
      <img
        src="/mandala-corner.png"
        alt=""
        className="absolute left-0 bottom-0 h-[24rem] w-auto opacity-[0.14] -translate-x-1/4 translate-y-1/4 sm:h-[26rem] md:h-[32rem] rotate-180"
        style={{ mixBlendMode: 'soft-light' }}
      />
      <img
        src="/mandala-corner.png"
        alt=""
        className="absolute left-0 top-0 h-40 w-auto opacity-[0.10] -translate-x-1/2 -translate-y-1/2 scale-75 sm:h-52 md:h-60 rotate-90"
      />
      <img
        src="/mandala-corner.png"
        alt=""
        className="absolute right-0 bottom-0 h-36 w-auto opacity-[0.08] translate-x-1/2 translate-y-1/2 scale-75 sm:h-44 md:h-52 -rotate-90"
      />
    </div>
  )
}
