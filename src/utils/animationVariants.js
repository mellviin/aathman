/**
 * Premium animation variants for Aathman Studios
 * Focused on cinematic, soft, luxurious motion
 * All timing designed for calm, editorial aesthetic
 */

// ────────────────────────────────────────────────────
// EASING FUNCTIONS
// ────────────────────────────────────────────────────
// Cinematic easing for smooth, expensive feel

export const easing = {
  // Soft, cinematic ease-out
  soft: [0.25, 0.46, 0.45, 0.94],
  // Gentle ease-out for longer animations
  gentle: [0.34, 1.56, 0.64, 1],
  // Classic ease-in-out for reversible animations
  smooth: [0.4, 0.0, 0.2, 1],
}

// ────────────────────────────────────────────────────
// IMAGE REVEALS & FADES
// ────────────────────────────────────────────────────

export const imageReveal = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.9, ease: easing.soft },
}

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easing.soft },
}

export const blurToFocus = {
  initial: { opacity: 0.4, filter: 'blur(6px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: easing.gentle },
}

// ────────────────────────────────────────────────────
// SCROLL TRIGGERED REVEALS
// ────────────────────────────────────────────────────

export const scrollReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: easing.soft },
}

export const scrollFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { duration: 1.0, ease: easing.smooth },
}

export const scrollSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: easing.soft },
}

// ────────────────────────────────────────────────────
// HOVER EFFECTS (Image Grid)
// ────────────────────────────────────────────────────

export const hoverImageScale = {
  whileHover: { scale: 1.01 },
  transition: { duration: 0.5, ease: easing.smooth },
}

export const hoverImageOpacity = {
  whileHover: { opacity: 0.95 },
  transition: { duration: 0.4, ease: easing.soft },
}

// ────────────────────────────────────────────────────
// NAVIGATION & INTERACTIVE ELEMENTS
// ────────────────────────────────────────────────────

export const navItemHover = {
  whileHover: { color: '#ffffff' },
  transition: { duration: 0.3, ease: easing.smooth },
}

export const underlineHover = {
  initial: { scaleX: 0, opacity: 0 },
  whileHover: { scaleX: 1, opacity: 1 },
  transition: { duration: 0.4, ease: easing.soft },
}

export const buttonHover = {
  whileHover: { scale: 1.01, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
  whileTap: { scale: 0.99 },
  transition: { duration: 0.3, ease: easing.smooth },
}

// ────────────────────────────────────────────────────
// AMBIENT MOTION (Very subtle)
// ────────────────────────────────────────────────────

export const ambientFloat = {
  initial: { y: 0 },
  animate: { y: 2 },
  transition: {
    duration: 4.8,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
}

export const ambientOpacity = {
  initial: { opacity: 0.14 },
  animate: { opacity: 0.18 },
  transition: {
    duration: 5.2,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
}

// ────────────────────────────────────────────────────
// SECTION & HEADING REVEALS
// ────────────────────────────────────────────────────

export const sectionHeadingReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.95, ease: easing.soft },
}

export const sectionCopyReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: easing.soft, delay: 0.1 },
}

// ────────────────────────────────────────────────────
// HERO ANIMATIONS
// ────────────────────────────────────────────────────

export const heroImageZoom = {
  initial: { scale: 1.08 },
  animate: { scale: 1 },
  transition: { duration: 3.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

export const heroImageAmbient = {
  initial: { y: 0 },
  animate: { y: 1.2 },
  transition: {
    duration: 6.4,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
}

// ────────────────────────────────────────────────────
// VIEWPORT CONFIGURATION
// ────────────────────────────────────────────────────

export const viewportSettings = {
  once: true,
  amount: 0.4, // Trigger when 40% of element is visible (less sensitive)
}

export const viewportSettingsSensitive = {
  once: true,
  amount: 0.5, // More conservative for large elements (less sensitive)
}
