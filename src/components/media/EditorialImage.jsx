import { OptimizedImage } from './OptimizedImage'
import { memo } from 'react'

export const EditorialImage = memo(function EditorialImage({
  image,
  alt,
  className = '',
  priority = false,
  overlay = false,
  monochrome = false,
  children,
}) {
  return (
    <OptimizedImage
      src={image}
      alt={alt}
      className={className}
      priority={priority}
      monochrome={monochrome}
      overlay={overlay}
    >
      {children}
    </OptimizedImage>
  )
})
