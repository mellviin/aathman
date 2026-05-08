import { memo, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isRemote = (src) => typeof src === 'string' && /^https?:\/\//.test(src)

/**
 * Pexels URLs already carry ?auto=compress&cs=tinysrgb&w=…&h=…
 * We just need to override `w` (and optionally `h`) for each breakpoint.
 * We do NOT add `fm=webp` — Pexels serves WebP automatically when the browser
 * sends `Accept: image/webp` (which all modern browsers do).
 */
const pexelsWidth = (src, w) => {
  try {
    const url = new URL(src)
    url.searchParams.set('w', w)
    url.searchParams.set('auto', 'compress')
    // Remove explicit height so the CDN scales proportionally
    url.searchParams.delete('h')
    return url.toString()
  } catch {
    return src
  }
}

/**
 * Build a srcSet for Pexels images at sensible breakpoints.
 * Returns '' for local/imported assets (Vite handles those).
 */
const buildSrcSet = (src) => {
  if (!src || !isRemote(src)) return ''
  if (!src.includes('pexels.com')) return ''
  return [480, 800, 1200, 1600, 2000]
    .map((w) => `${pexelsWidth(src, w)} ${w}w`)
    .join(', ')
}

/** Default src — for Pexels use 1200px; for locals use as-is. */
const resolveSrc = (src) => {
  if (!src) return ''
  if (isRemote(src) && src.includes('pexels.com')) return pexelsWidth(src, 1200)
  return typeof src === 'string' ? src : src // imported asset → already a hashed URL string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  /**
   * sizes tells the browser how wide the image will actually be rendered.
   * Override per call-site for more precise hints (saves bandwidth on mobile).
   */
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw',
  monochrome = false,
  overlay = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  // If the browser already has the image cached, `onLoad` won't fire again —
  // check `.complete` synchronously so we never show a blank flash.
  const handleRef = (el) => {
    imgRef.current = el
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true)
  }

  const resolvedSrc = resolveSrc(src)
  const srcSet      = buildSrcSet(src)

  return (
    <div
      className={`optimized-image relative overflow-hidden group image-frame ${className} ${loaded ? 'loaded' : 'loading'}`}
      // Cream-toned background shows while the image loads — no extra HTTP request
      style={{ backgroundColor: '#f2ece2' }}
    >
      <picture>
        {srcSet && (
          <source
            srcSet={srcSet}
            sizes={sizes}
            // No type="image/webp" here — the <source> is already for Pexels
            // which auto-negotiates format. Adding the wrong type causes some
            // browsers to ignore the srcSet entirely.
          />
        )}
        <img
          ref={handleRef}
          src={resolvedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          className="h-full w-full object-cover object-center"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
            filter: monochrome ? 'grayscale(100%) contrast(1.14) brightness(1.02)' : 'none',
            // Only hint GPU compositing for above-the-fold priority images
            willChange: priority ? 'opacity' : 'auto',
          }}
        />
      </picture>

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#11111110] opacity-30" />
      )}

      {children}
    </div>
  )
})