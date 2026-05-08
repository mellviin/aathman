import { useEffect, useMemo, useState } from 'react'
import { memo } from 'react'

const isRemoteImage = (src) => typeof src === 'string' && /^https?:\/\//.test(src)

const buildRemoteImageUrl = (src, width, format = 'webp') => {
  try {
    const url = new URL(src)
    if (url.hostname.includes('pexels.com')) {
      if (url.search) {
        url.searchParams.set('fm', format)
        url.searchParams.set('w', width.toString())
        url.searchParams.set('auto', 'compress')
      } else {
        url.search = `fm=${format}&w=${width}&auto=compress`
      }
      return url.toString()
    }

    if (url.search) {
      url.searchParams.set('fm', format)
      url.searchParams.set('w', width.toString())
      return url.toString()
    }

    return `${src}?fm=${format}&w=${width}`
  } catch {
    return src
  }
}

const buildSrcSet = (src) => {
  if (!src || !isRemoteImage(src)) return ''
  const widths = [480, 760, 1080, 1440]
  return widths.map((width) => `${buildRemoteImageUrl(src, width)} ${width}w`).join(', ')
}

const resolveSrc = (src) => {
  if (!src) return src
  if (isRemoteImage(src)) {
    return buildRemoteImageUrl(src, 1080)
  }
  if (typeof src === 'string') {
    return src
  }
  return src
}

const buildPlaceholder = (src) => {
  if (!src) return ''
  if (isRemoteImage(src)) {
    return buildRemoteImageUrl(src, 60)
  }
  return src
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  monochrome = false,
  overlay = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false)
  const resolvedSrc = useMemo(() => resolveSrc(src), [src])
  const srcSet = useMemo(() => buildSrcSet(src), [src])
  const placeholder = useMemo(() => buildPlaceholder(src), [src])

  useEffect(() => {
    setLoaded(false)
  }, [resolvedSrc])

  const dataStyle = {
    backgroundImage: placeholder
      ? `linear-gradient(rgba(246,241,232,0.3), rgba(246,241,232,0.3)), url(${placeholder})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div
      className={`optimized-image relative overflow-hidden group image-frame ${className} ${loaded ? 'loaded' : 'loading'}`}
      style={dataStyle}
    >
      <picture>
        {isRemoteImage(src) && srcSet && (
          <source srcSet={srcSet} sizes={sizes} type="image/webp" />
        )}
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover object-center transition-opacity duration-700 ease-out will-change-auto"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.45s ease-out',
            filter: monochrome ? 'grayscale(100%) contrast(1.14) brightness(1.02)' : 'none',
          }}
        />
      </picture>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#11111110] opacity-30 transition-opacity duration-700" />
      )}
      {children}
    </div>
  )
})
