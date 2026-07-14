import { OptimizedImage } from './OptimizedImage'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { imageReveal, viewportSettings } from '../../utils/animationVariants'

export const EditorialImage = memo(function EditorialImage({
  image,
  alt,
  className = '',
  priority = false,
  overlay = false,
  monochrome = false,
  children,
  disableAnimation = false,
}) {
  // For hero and priority images, use immediate animations
  // For grid images, use scroll-triggered reveals
  const shouldAnimate = !disableAnimation && !priority
  
  const imageElement = (
    <OptimizedImage
      src={image}
      alt={alt}
      priority={priority}
      monochrome={monochrome}
      overlay={overlay}
    >
      {children}
    </OptimizedImage>
  )

  if (shouldAnimate) {
    return (
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
        variants={imageReveal}
        className={className}
      >
        {imageElement}
      </motion.div>
    )
  }

  return <div className={className}>{imageElement}</div>
})
