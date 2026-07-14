import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EditorialImage } from './components/media/EditorialImage'
import { EditorialVideo } from './components/media/EditorialVideo'
import { mediaLibrary } from './data/media'
import heroSplash from './assets/aathman_logo.png'
import {
  heroImageZoom,
  heroImageAmbient,
  fadeUp,
  blurToFocus,
  easing,
} from './utils/animationVariants'

const EditorialVideoCard = lazy(() => import('./components/media/EditorialVideoCard.jsx'))
const MandalaCorners = lazy(() =>
  import('./components/shared/MandalaCorners.jsx').then((mod) => ({ default: mod.MandalaCorners })),
)

const bookingPrompts = [
  { key: 'name', label: 'What should we call your story?', placeholder: 'Your names together', type: 'text' },
  { key: 'date', label: 'When does your forever begin?', placeholder: 'Your wedding date', type: 'date' },
  { key: 'location', label: 'Where will this memory live?', placeholder: 'Your wedding destination', type: 'text' },
  {
    key: 'celebration',
    label: 'What kind of celebration are you dreaming of?',
    placeholder: 'Select your celebration style',
    type: 'select',
    options: ['Intimate & Romantic', 'Grand & Elegant', 'Destination Paradise', 'Cultural Heritage', 'Modern Minimalist'],
  },
  {
    key: 'story',
    label: 'Tell us about your story...',
    placeholder: "Share the essence of your day, your vision, the mood you're dreaming of...",
    type: 'textarea',
  },
]

// ⚠️  Replace with your real Formspree endpoint before going live.
// Create a free form at https://formspree.io and paste the form ID below.
const FORM_ENDPOINT = 'https://formspree.io/f/xjglopyv'

function preloadAsset(href, as = 'image') {
  if (!href || typeof document === 'undefined') return
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = href
  if (href.startsWith('http')) link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}

// ---------------------------------------------------------------------------
// SplashScreen
// ---------------------------------------------------------------------------
function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f6f1e8]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative z-10 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <img
          src={heroSplash}
          alt="aathman studios"
          className="mx-auto mb-6 h-20 w-auto object-contain md:h-28"
        />
        <p className="mb-3 text-xs tracking-[0.28em] text-[#8b7864]" aria-hidden="true" />
        <p className="mt-2 text-xs tracking-[0.18em] text-[#2a2622] md:text-sm"></p>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// HeroStart
// ---------------------------------------------------------------------------
// Uses <header> so the logo/nav <h1> is the single top-level heading on the
// page, avoiding duplicate <h1> landmarks with the splash screen title.
// ---------------------------------------------------------------------------
function HeroStart() {
  const [showTopNav, setShowTopNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTopNav(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero background image with cinematic zoom */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <EditorialImage
          image={mediaLibrary.hero.image}
          alt="Luxury monochrome wedding editorial hero"
          className="h-full w-full"
          priority
          monochrome
          disableAnimation
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.02),transparent_20%)] opacity-30" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_25%,rgba(0,0,0,0.08))]" />
        </EditorialImage>
      </motion.div>

      {/* ── Top navigation bar ── */}
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 ${showTopNav ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: showTopNav ? 1 : 0, y: showTopNav ? 0 : -24 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Soft blur background */}
        <div
          className="
            absolute inset-0
            -z-10
            backdrop-blur-[4px]
            bg-gradient-to-b
            from-white/10
            via-white/5
            to-transparent
            pointer-events-none
          "
        />

        <div className="relative flex items-center justify-between px-10 py-6 lg:px-16">
          {/* Brand mark */}
          <div className="flex items-center space-x-8">
            <a href="#top" className="inline-flex items-center">
              <img
                src={heroSplash}
                alt="aathman studios"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center space-x-8 nav-gradient-blur"
          >
            {[
              { href: '#stories', label: 'Stories' },
              { href: '#films', label: 'Films' },
              { href: '#mosaic', label: 'Editorial' },
              { href: '#journal', label: 'Journal' },
              { href: '#begin', label: 'Contact' },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-[#111111] hover:text-[#8b7864] tracking-[0.08em] text-sm transition-colors duration-300"
                style={{ textShadow: '0 0 12px rgba(255,255,255,0.85)' }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* ── Hero bottom caption bar ── */}
      <motion.div
        className="absolute inset-0 z-10 flex items-end px-5 pb-10 md:px-12 md:pb-14"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.35 }}
      >
        <div className="flex w-full items-end justify-between">
          <div>
            {/* Location / tagline slot — populate once copy is finalised */}
            <p className="text-[10px] tracking-[0.24em] text-[#f0e9dc]" aria-hidden="true" />
            <p className="mt-2 text-4xl leading-none text-[#f9f2e6] md:text-6xl" aria-hidden="true" />
          </div>
          <p className="hidden text-[10px] tracking-[0.16em] text-[#efe6d8] md:block">
            
          </p>
        </div>
      </motion.div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// App (root component)
// ---------------------------------------------------------------------------
export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [step, setStep] = useState(0)
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [formData, setFormData] = useState({ name: '', date: '', location: '', celebration: '', story: '' })
  const [status, setStatus] = useState('idle')

  const isFinalStep = step === bookingPrompts.length - 1
  const currentPrompt = bookingPrompts[step]

  // Explicit journal image order — edit mediaLibrary.journal to choose which photos appear and where.
  const journalFrames = useMemo(
    () => mediaLibrary.journal,
    [], // intentionally empty — mediaLibrary is a static module-level constant
  )

  // Preload above-the-fold assets so the hero image is ready instantly
  useEffect(() => {
    preloadAsset(mediaLibrary.hero.image)
    // poster is now always a valid string (not undefined)
    preloadAsset(mediaLibrary.splash.poster)
    if (mediaLibrary.mosaic[0]) preloadAsset(mediaLibrary.mosaic[0].image)
    if (mediaLibrary.mosaic[1]) preloadAsset(mediaLibrary.mosaic[1].image)

    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const submitInquiry = async (event) => {
    event.preventDefault()
    // Steps 1-4: advance through the multi-step form without submitting yet
    if (!isFinalStep) {
      setStep((prev) => prev + 1)
      return
    }
    setStatus('loading')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          wedding_date: formData.date,
          location: formData.location,
          celebration_type: formData.celebration,
          story: formData.story,
        }),
      })
      if (!response.ok) throw new Error('Network response was not ok')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen"
        >
          {/* Decorative mandala corners */}
          <Suspense fallback={null}>
            <MandalaCorners />
          </Suspense>

          <main className="relative z-10">
            {/* ── Hero ── */}
            <HeroStart />

            {/* ── Mosaic Grid ── */}
            <section id="mosaic" className="relative px-5 py-20 md:px-12 md:py-28">
              <div className="w-full">
                <p className="section-label mb-10">CURATED WEDDING MOSAIC</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-10 max-w-2xl"
                >
                  <h2 className="text-4xl leading-[0.95] text-[#111111] md:text-5xl">Moments That Outlive Time</h2>
                  <p className="section-copy">
                    Curated glimpses of vows, stillness, and celebration woven into one visual rhythm.
                  </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-1 md:grid-cols-12 md:grid-rows-1 md:gap-1">
                  <EditorialImage image={mediaLibrary.mosaic[0].image} alt="Mosaic one" className="h-52 md:col-span-4 md:row-span-2 md:h-[69.3rem]" priority />
                  <EditorialImage image={mediaLibrary.mosaic[1].image} alt="Mosaic two" className="h-52 md:col-span-5 md:h-[39rem]" priority />
                  <Suspense fallback={<div className="h-52 md:col-span-3 md:h-[39rem] bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[0]}
                      className="h-52 md:col-span-3 md:h-[39rem]"
                    />
                  </Suspense>
                  <EditorialImage image={mediaLibrary.mosaic[3].image} alt="Mosaic four" className="h-62 md:col-span-4 md:h-[30rem]" />
                  <EditorialImage image={mediaLibrary.mosaic[4].image} alt="Mosaic five" className="h-52 md:col-span-4 md:h-[30rem]" />
                  <EditorialImage image={mediaLibrary.mosaic[5].image} alt="Mosaic six" className="h-52 md:col-span-2 md:h-[38rem]" />
                  {/* Previously used undefined mediaLibrary.hero.layered — now uses hero.layered (defined in media.js) */}
                  <EditorialImage image={mediaLibrary.hero.layered} alt="Mosaic seven" className="col-span-2 h-56 md:col-span-6 md:h-[38rem]" />
                  <EditorialImage image={mediaLibrary.philosophy.image1} alt="Mosaic eight" className="col-span-2 h-56 md:col-span-4 md:h-[38rem]" />
                </div>
              </div>
            </section>

            {/* ── Black & White Sequence ── */}
            <section className="relative px-5 pt-0 pb-4 md:px-12 md:pb-6">
              <div className="w-full">
                <p className="section-label mb-8">BLACK &amp; WHITE EMOTIONAL SEQUENCE</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-6 grid gap-3 md:grid-cols-12"
                >
                  <h2 className="text-3xl md:col-span-5 md:text-4xl">Where Emotion Becomes Cinema</h2>
                  <p className="max-w-md section-copy md:col-span-7 md:justify-self-end">
                    A monochrome passage of glances, textures, and silence.
                  </p>
                </motion.div>
                <div className="grid gap-1 md:grid-cols-12 md:grid-rows-2 md:gap-1">
                  <EditorialImage image={mediaLibrary.monochrome[0]} alt="Monochrome sequence one" className="h-[56vh] md:col-span-5 md:row-span-2 md:h-[65.8rem]" monochrome />
                  <Suspense fallback={<div className="h-[14vh] md:col-span-10 md:h-[35rem]" monochrome />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[3]}
                      className="h-[30vh] md:col-span-7 md:h-[40.75rem]"
                    />
                  </Suspense>
                  <EditorialImage image={mediaLibrary.monochrome[2]} alt="Monochrome sequence three" className="h-[30vh] md:col-span-7 md:h-[24.75rem]" monochrome />
                  
                </div>
              </div>
            </section>

            {/* ── Signature Films ── */}
            <section id="films" className="relative px-5 pt-0 pb-0 md:px-12 md:pt-0">
              <div className="w-full">
                <p className="section-label mb-8">SIGNATURE WEDDING FILMS</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-0 max-w-2xl"
                >
                  <h2 className="section-title text-4xl md:text-5xl">Crafted With Soul</h2>
                  <p className="section-copy">Presented like cinema posters, each film is cut as an heirloom.</p>
                </motion.div>
                <div className="grid gap-1 md:grid-cols-2">
                  {mediaLibrary.films.map((film) => (
                    // Use stable film.id (not film.title) as the React key
                    <motion.article
                      key={film.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ opacity: 0.94 }}
                      className="space-y-4"
                    >
                      <Suspense fallback={<div className="h-[10vh] bg-[#f4ebe0]" />}>
                        <EditorialVideoCard
                          item={film}
                          className="h-[70vh]"
                        />
                      </Suspense>
                      <div className="flex items-center justify-between border-t border-[#b7a07f50] pt-3">
                        <div>
                          <p className="section-label">{film.location}</p>
                          <h3 className="text-[1.45rem] font-['Cormorant_Garamond'] font-medium">{film.title}</h3>
                          <p className="mt-1 text-xs text-[#2a2622]">{film.phrase}</p>
                        </div>
                        <span className="border border-[#b7a07f70] px-3 py-1 text-[10px] tracking-[0.18em] text-[#2a2622]">
                          {film.runtime}
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Editorial Film Spread ── */}
            <section className="relative px-5 py-20 md:px-12 md:py-28">
              <div className="w-full">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="section-label mb-10"
                >
                  EDITORIAL FILM SPREAD
                </motion.p>
                <div className="grid gap-5 md:grid-cols-12 md:gap-1">
                  <Suspense fallback={<div className="h-[55vh] md:col-span-5 md:h-[46rem] bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[1]}
                      className="h-[55vh] md:col-span-5 md:h-[46rem]"
                    />
                  </Suspense>
                  <Suspense fallback={<div className="h-[55vh] md:col-span-7 md:h-[46rem] bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[2]}
                      className="h-[55vh] md:col-span-7 md:h-[46rem]"
                    />
                  </Suspense>
                </div>
              </div>
            </section>

            {/* ── Destination Stories ── */}
            <section id="stories" className="relative px-5 py-20 md:px-12 md:py-28">
              <div className="w-full space-y-14">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p className="section-label">DESTINATION WEDDING STORIES</p>
                  <div className="mt-6 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl">Stories Woven In Light</h2>
                    <p className="section-copy">Couple narratives written through place, ritual, and atmosphere.</p>
                  </div>
                </motion.div>
                {mediaLibrary.stories.map((story, index) => (
                  <motion.div
                    key={story.title}
                    className={`space-y-6 ${index % 2 ? '' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="relative left-1/2 w-screen -translate-x-1/2">
                      {story.video ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="h-[90vh] w-full object-cover"
                        >
                          <source src={story.video} type="video/mp4" />
                        </video>
                      ) : (
                        <EditorialImage
                          image={story.image}
                          alt={story.title}
                          className="h-[90vh] w-full max-w-none"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Portrait Spreads ── */}
            <section className="relative px-0 py-20 md:px-12 md:py-28 overflow-hidden">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p className="section-label mb-10">LUXURY COUPLE PORTRAIT SPREADS</p>
                  <div className="mb-10 grid gap-3 md:grid-cols-12">
                    <h2 className="text-3xl md:col-span-5 md:text-4xl">An Heirloom Of Memories</h2>
                    <p className="max-w-md section-copy md:col-span-7 md:justify-self-end">
                      Fashion-inspired portrait studies shaped with calm, natural luxury.
                    </p>
                  </div>
                </motion.div>
                <div className="grid gap-1 md:grid-cols-12 md:grid-rows-2 md:gap-1">
                  <EditorialImage image={mediaLibrary.philosophy.image} alt="Portrait spread two" className="h-[36vh] md:col-span-5 md:h-[32rem]" />
                  <EditorialImage image={mediaLibrary.hero.image} alt="Portrait spread three" className="h-[36vh] md:col-span-7 md:h-[32rem]" />
                  <EditorialImage image={mediaLibrary.booking.image} alt="Portrait spread four" className="h-[56vh] md:col-span-8 md:h-[24rem]" />
                  <EditorialVideo video={mediaLibrary.booking.image1} />
                </div>
              </div>
            </section>

            {/* ── Journal Grid ── */}
            {/* id="journal" added so the Journal nav link resolves correctly */}
            <section id="journal" className="relative px-5 py-20 md:px-12 md:py-8">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p className="section-label mb-10">WEDDING JOURNAL GRID</p>
                  <div className="mb-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl">A Living Editorial Archive</h2>
                    <p className="section-copy">
                      Small chapters of movement, devotion, and celebration across destinations.
                    </p>
                  </div>
                </motion.div>
                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-1">
                  {journalFrames.slice(0, 12).map((image, index) => (
                    <EditorialImage
                      // image URL is stable; index prevents collisions when the same
                      // URL appears more than once across mosaic + films + stories
                      key={`journal-${index}-${image}`}
                      image={image}
                      alt={`Wedding journal frame — ${mediaLibrary.destinations[index % mediaLibrary.destinations.length]}`}
                      className={`h-52 md:h-72 ${index % 5 === 0 ? 'md:col-span-2' : ''}`}
                      monochrome={index % 6 === 0}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="absolute bottom-2 left-2 border border-[#f0e9dc80] bg-[#1111113a] px-2 py-1 text-[9px] tracking-[0.15em] text-[#f5eee2]"
                      >
                        {mediaLibrary.destinations[index % mediaLibrary.destinations.length]}
                      </motion.div>
                    </EditorialImage>
                  ))}
                  <Suspense fallback={<div className="col-span-2 h-56 md:col-span-2 md:h-72 bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[0]}
                      className="col-span-2 h-56 md:col-span-2 md:h-72"
                    />
                  </Suspense>
                </div>
              </div>
            </section>

            {/* ── Large Closing Editorial Image ── */}
            <section className="relative px-5 py-20 md:px-12 md:py-28">
              <div className="w-full">
                <EditorialVideo
                  video={mediaLibrary.closing.video}
                  thumbnail={mediaLibrary.closing.thumbnail}
                  className="h-[80vh] w-full md:h-[90vh]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mt-8 max-w-2xl"
                >
                  <h2 className="text-3xl leading-[0.95] text-[#111111] md:text-4xl">Forever Begins Here</h2>
                  <p className="section-copy">
                    Where every moment becomes an heirloom, every glance a memory etched in light.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* ── Footer ── */}
            <footer className="relative footer-panel border-t border-[#b7a07f40] px-5 py-16 md:px-12 md:py-20">
              <div className="flex w-full flex-col gap-10 md:flex-row md:justify-between">
                <div>
                  <p className="text-xs tracking-[0.24em] text-[#1b1b1b]" href="https://aathman-kirr.vercel.app/">
                    aathman studios
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.18em] text-[#8b7864]"></p>
                </div>
                <div className="grid gap-2 text-sm text-[#2a2622]">
                  <motion.a
                    href="https://www.instagram.com/aathman_studios?igsh=dXM4a3Z6aTB3c2t6"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#8b7864] transition-colors"
                    whileHover={{ color: '#8b7864' }}
                    transition={{ duration: 0.3 }}
                  >
                    aathmanstudios@instagram
                  </motion.a>
                  <motion.a
                    href="mailto:aathmanstudios@gmail.com"
                    className="hover:text-[#8b7864] transition-colors"
                    whileHover={{ color: '#8b7864' }}
                    transition={{ duration: 0.3 }}
                  >
                    aathmanstudios@gmail.com
                  </motion.a>
                  <p className="text-xs">India | Europe | Worldwide</p>
                  <p className="text-xs">+91 70229 06802</p>
                </div>
                <nav aria-label="Footer">
                  <ul className="flex flex-col gap-2 text-sm text-[#2a2622] list-none p-0 m-0">
                    <li>
                      <motion.a
                        href="#stories"
                        className="hover:text-[#8b7864] transition-colors"
                        whileHover={{ color: '#8b7864' }}
                        transition={{ duration: 0.3 }}
                      >
                        Stories
                      </motion.a>
                    </li>
                    <li>
                      <motion.a
                        href="#films"
                        className="hover:text-[#8b7864] transition-colors"
                        whileHover={{ color: '#8b7864' }}
                        transition={{ duration: 0.3 }}
                      >
                        Films
                      </motion.a>
                    </li>
                    <li>
                      <motion.a
                        href="#begin"
                        className="hover:text-[#8b7864] transition-colors"
                        whileHover={{ color: '#8b7864' }}
                        transition={{ duration: 0.3 }}
                      >
                        Contact
                      </motion.a>
                    </li>
                  </ul>
                </nav>
              </div>
            </footer>

            {/* ── Booking / Contact ── */}
            <section id="begin" className="relative overflow-hidden px-5 py-16 md:px-12 md:py-24">
              <div className="absolute inset-0">
                <EditorialImage image={mediaLibrary.philosophy.image3} alt="Contact backdrop" className="h-full w-full" overlay={false} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f6f1e8]/20 to-[#f6f1e8]/45" />
              <div className="relative w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="mb-16 text-center"
                >
                  <p className="section-label">LET US FRAME YOUR STORY</p>
                  <h2 className="mt-3 text-3xl md:text-4xl text-[#111111]">Where does your forever begin?</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#2a2622]">
                    Share the essence of your day. We'll craft a narrative that captures your soul.
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center py-20"
                    >
                      <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl text-[#111111] mb-6">Your story has been received.</h2>
                        <p className="text-lg text-[#2a2622] leading-relaxed mb-8">
                          And we cannot wait to frame it forever.
                        </p>
                        <p className="text-sm text-[#8b7864]">
                          We'll respond within 24 hours with our vision for your story.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-[#f6f1e8]/40 backdrop-blur-sm rounded-2xl border border-[#f2ede3]/50 shadow-2xl" />
                      <div className="relative p-8 md:p-12">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl md:text-3xl text-[#111111] mb-2">{currentPrompt.label}</h3>
                              <div className="w-16 h-px bg-[#8b7864]" />
                            </div>

                            <form onSubmit={submitInquiry} className="space-y-8 relative">
                              {/* Step counter — pinned right */}
                              <p className="absolute right-0 top-1 text-xs tracking-[0.18em] text-[#8b7864]">
                                {step + 1} of {bookingPrompts.length}
                              </p>

                              <div className="max-w-2xl mx-auto">
                                {currentPrompt.type === "textarea" ? (
                                  <textarea
                                    required
                                    rows={6}
                                    value={formData[currentPrompt.key]}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        [currentPrompt.key]: e.target.value,
                                      }))
                                    }
                                    className="contact-input resize-none text-lg leading-relaxed w-full rounded-md border border-black shadow-none outline-none focus:border-black focus:outline-none focus:ring-0 focus:shadow-none transition-none"
                                    placeholder={currentPrompt.placeholder}
                                  />
                                ) : currentPrompt.type === 'select' ? (
                                  <select
                                    required
                                    value={formData[currentPrompt.key]}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        [currentPrompt.key]: e.target.value,
                                      }))
                                    }
                                    className="contact-input text-lg w-full rounded-md border border-black shadow-none outline-none focus:border-black focus:outline-none focus:ring-0 focus:shadow-none transition-none"
                                  >
                                    <option value="" disabled>
                                      {currentPrompt.placeholder}
                                    </option>
                                    {currentPrompt.options.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    required
                                    type={currentPrompt.type}
                                    value={formData[currentPrompt.key]}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        [currentPrompt.key]: e.target.value,
                                      }))
                                    }
                                    className="contact-input text-lg w-full rounded-md border border-black shadow-none outline-none focus:border-black focus:outline-none focus:ring-0 focus:shadow-none transition-none"
                                    placeholder={currentPrompt.placeholder}
                                  />
                                )}
                              </div>

                              <div className="flex items-center justify-center pt-8">
                                <motion.button
                                  type="submit"
                                  disabled={status === 'loading'}
                                  whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(139, 120, 100, 0.25)' }}
                                  whileTap={{ scale: 0.98 }}
                                  transition={{ duration: 0.3 }}
                                  className="px-8 py-3 border border-[#8b7864] text-[#111111] hover:bg-[#8b7864] hover:text-[#f6f1e8] transition-all duration-500 text-sm tracking-[0.15em] disabled:opacity-60"
                                >
                                  {status === 'loading'
                                    ? 'Sending…'
                                    : isFinalStep
                                    ? 'Begin The Journey'
                                    : 'Continue'}
                                </motion.button>
                              </div>

                              {status === 'error' && (
                                <motion.p
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-6 text-center text-sm text-[#8b7864]"
                                >
                                  Something went wrong. Please set a valid Formspree endpoint or try again.
                                </motion.p>
                              )}
                            </form>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
