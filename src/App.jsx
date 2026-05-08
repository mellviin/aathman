import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EditorialImage } from './components/media/EditorialImage'
import { mediaLibrary } from './data/media'

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
const FORM_ENDPOINT = 'https://formspree.io/f/your-form-id'

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
      <div className="absolute inset-0">
        {/* poster prevents layout shift while the video loads */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={mediaLibrary.splash.poster}
          className="h-full w-full object-cover opacity-[0.24]"
        >
          <source src={mediaLibrary.splash.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#f6f1e8c4]" />
      </div>
      <motion.div
        className="relative z-10 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        {/* Intentionally empty tagline slot — populate when copy is ready */}
        <p className="mb-3 text-xs tracking-[0.28em] text-[#8b7864]" aria-hidden="true" />
        <h1 className="text-5xl md:text-7xl leading-none tracking-wide">
          <span className="font-['CoreSansD'] font-bold lowercase tracking-[-0.08em] text-[#111111] text-xl md:text-7xl align-middle">
            aathman
          </span>
          <span
            style={{ fontFamily: 'ITC Garamond Std Condensed Light Italic' }}
            className="italic tracking-[0em] text-[#111111] text-2xl md:text-7xl align-middle"
          >
            studios
          </span>
        </h1>
        <p className="mt-2 text-xs tracking-[0.18em] text-[#2a2622] md:text-sm">Capturing Souls, Not Just Moments</p>
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
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <EditorialImage
        image={mediaLibrary.hero.image}
        alt="Luxury monochrome wedding editorial hero"
        className="absolute inset-0 h-full w-full"
        priority
        monochrome
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.02),transparent_20%)] opacity-30" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_25%,rgba(0,0,0,0.08))]" />
      </EditorialImage>

      {/* ── Top navigation bar ── */}
      <motion.header
        className="absolute left-0 right-0 top-0 z-20 px-5 pt-5 md:px-12 md:pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.2 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between border border-[#f2ede37a] bg-[#1111111a] px-4 py-3 backdrop-blur-[2px] md:px-6">
          {/* Brand mark — single <h1> for the page */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold tracking-wide">
              <span className="font-['CoreSansD'] lowercase tracking-[-0.08em] text-[#111111]">aathman</span>
              <span className="font-['ITC_Garamond_Std_Condensed_Light_Italic'] italic tracking-[0.0em] text-[#111111]">
                studios
              </span>
            </h1>
          </div>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center space-x-8">
            <a href="#stories" className="nav-link">Stories</a>
            <a href="#films" className="nav-link">Films</a>
            <a href="#mosaic" className="nav-link">Editorial</a>
            {/* Journal links to #journal section — not #mosaic */}
            <a href="#journal" className="nav-link">Journal</a>
            <a href="#begin" className="nav-link">Contact</a>
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
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between">
          <div>
            {/* Location / tagline slot — populate once copy is finalised */}
            <p className="text-[10px] tracking-[0.24em] text-[#f0e9dc]" aria-hidden="true" />
            <p className="mt-2 text-4xl leading-none text-[#f9f2e6] md:text-6xl" aria-hidden="true" />
          </div>
          <p className="hidden text-[10px] tracking-[0.16em] text-[#efe6d8] md:block">
            Timeless frames. Intimate cinema.
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

  // Stable combined list of images for the journal grid
  const journalFrames = useMemo(
    () => [
      ...mediaLibrary.mosaic.map((item) => item.image),
      ...mediaLibrary.films.map((item) => item.image),
      ...mediaLibrary.stories.map((item) => item.image),
    ],
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
            <section id="mosaic" className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <p className="section-label mb-10">CURATED WEDDING MOSAIC</p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8 }}
                  className="mb-10 max-w-2xl"
                >
                  <h2 className="text-4xl leading-[0.95] text-[#111111] md:text-5xl">Moments That Outlive Time</h2>
                  <p className="section-copy">
                    Curated glimpses of vows, stillness, and celebration woven into one visual rhythm.
                  </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-3 md:gap-6">
                  <EditorialImage image={mediaLibrary.mosaic[0].image} alt="Mosaic one" className="h-52 md:col-span-4 md:row-span-2 md:h-[40rem]" priority />
                  <EditorialImage image={mediaLibrary.mosaic[1].image} alt="Mosaic two" className="h-52 md:col-span-5 md:h-[19rem]" priority />
                  <Suspense fallback={<div className="h-52 md:col-span-3 md:h-[19rem] bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[0]}
                      activeVideoId={activeVideoId}
                      setActiveVideoId={setActiveVideoId}
                      className="h-52 md:col-span-3 md:h-[19rem]"
                    />
                  </Suspense>
                  <EditorialImage image={mediaLibrary.mosaic[3].image} alt="Mosaic four" className="h-52 md:col-span-3 md:h-[20rem]" />
                  <EditorialImage image={mediaLibrary.mosaic[4].image} alt="Mosaic five" className="h-52 md:col-span-4 md:h-[20rem]" />
                  <EditorialImage image={mediaLibrary.mosaic[5].image} alt="Mosaic six" className="h-52 md:col-span-5 md:h-[20rem]" />
                  {/* Previously used undefined mediaLibrary.hero.layered — now uses hero.layered (defined in media.js) */}
                  <EditorialImage image={mediaLibrary.hero.layered} alt="Mosaic seven" className="col-span-2 h-56 md:col-span-6 md:h-[18rem]" />
                  <EditorialImage image={mediaLibrary.philosophy.image} alt="Mosaic eight" className="col-span-2 h-56 md:col-span-6 md:h-[18rem]" />
                </div>
              </div>
            </section>

            {/* ── Black & White Sequence ── */}
            <section className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <p className="section-label mb-10">BLACK &amp; WHITE EMOTIONAL SEQUENCE</p>
                <div className="mb-10 grid gap-3 md:grid-cols-12">
                  <h2 className="text-3xl md:col-span-5 md:text-4xl">Where Emotion Becomes Cinema</h2>
                  <p className="max-w-md section-copy md:col-span-7 md:justify-self-end">
                    A monochrome passage of glances, textures, and silence.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6">
                  <EditorialImage image={mediaLibrary.monochrome[0]} alt="Monochrome sequence one" className="h-[62vh] md:col-span-5 md:row-span-2 md:h-[50rem]" monochrome />
                  <EditorialImage image={mediaLibrary.monochrome[1]} alt="Monochrome sequence two" className="h-[30vh] md:col-span-7 md:h-[24.5rem]" monochrome />
                  <EditorialImage image={mediaLibrary.monochrome[2]} alt="Monochrome sequence three" className="h-[30vh] md:col-span-7 md:h-[24.5rem]" monochrome />
                </div>
              </div>
            </section>

            {/* ── Signature Films ── */}
            <section id="films" className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <p className="section-label mb-10">SIGNATURE WEDDING FILMS</p>
                <div className="mb-10 max-w-2xl">
                  <h2 className="section-title text-4xl md:text-5xl">Crafted With Soul</h2>
                  <p className="section-copy">Presented like cinema posters, each film is cut as an heirloom.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                  {mediaLibrary.films.map((film) => (
                    // Use stable film.id (not film.title) as the React key
                    <motion.article key={film.id} whileHover={{ opacity: 0.94 }} transition={{ duration: 0.35 }} className="space-y-4">
                      <Suspense fallback={<div className="h-[70vh] bg-[#f4ebe0]" />}>
                        <EditorialVideoCard
                          item={film}
                          activeVideoId={activeVideoId}
                          setActiveVideoId={setActiveVideoId}
                          className="h-[70vh]"
                        />
                      </Suspense>
                      <div className="flex items-center justify-between border-t border-[#b7a07f50] pt-3">
                        <div>
                          <p className="section-label">{film.location}</p>
                          <h3 className="text-[1.45rem]">{film.title}</h3>
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
            <section className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <p className="section-label mb-10">EDITORIAL FILM SPREAD</p>
                <div className="grid gap-5 md:grid-cols-12 md:gap-6">
                  <Suspense fallback={<div className="h-[55vh] md:col-span-5 md:h-[46rem] bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[1]}
                      activeVideoId={activeVideoId}
                      setActiveVideoId={setActiveVideoId}
                      className="h-[55vh] md:col-span-5 md:h-[46rem]"
                    />
                  </Suspense>
                  <Suspense fallback={<div className="h-[55vh] md:col-span-7 md:h-[46rem] bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[2]}
                      activeVideoId={activeVideoId}
                      setActiveVideoId={setActiveVideoId}
                      className="h-[55vh] md:col-span-7 md:h-[46rem]"
                    />
                  </Suspense>
                </div>
              </div>
            </section>

            {/* ── Destination Stories ── */}
            <section id="stories" className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl space-y-14">
                <p className="section-label">DESTINATION WEDDING STORIES</p>
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl">Stories Woven In Light</h2>
                  <p className="section-copy">Couple narratives written through place, ritual, and atmosphere.</p>
                </div>
                {mediaLibrary.stories.map((story, index) => (
                  <div
                    key={story.title}
                    className={`grid gap-5 md:grid-cols-12 ${index % 2 ? 'md:[&>*:first-child]:order-last' : ''}`}
                  >
                    <EditorialImage image={story.image} alt={story.title} className="h-[70vh] md:col-span-9" />
                    <div className="self-end md:col-span-4">
                      <p className="section-label">JOURNAL</p>
                      <h3 className="mt-2 text-2xl">{story.title}</h3>
                      <p className="section-copy">
                        {index === 0
                          ? 'An intimate celebration beneath the Tuscan sun.'
                          : 'A candlelit evening of vows and quiet joy.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Portrait Spreads ── */}
            <section className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <p className="section-label mb-10">LUXURY COUPLE PORTRAIT SPREADS</p>
                <div className="mb-10 grid gap-3 md:grid-cols-12">
                  <h2 className="text-3xl md:col-span-5 md:text-4xl">An Heirloom Of Memories</h2>
                  <p className="max-w-md section-copy md:col-span-7 md:justify-self-end">
                    Fashion-inspired portrait studies shaped with calm, natural luxury.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6">
                  <EditorialImage image={mediaLibrary.hero.layered} alt="Portrait spread one" className="h-[36vh] md:col-span-4 md:h-[22rem]" />
                  <EditorialImage image={mediaLibrary.philosophy.image} alt="Portrait spread two" className="h-[36vh] md:col-span-8 md:h-[22rem]" />
                  <EditorialImage image={mediaLibrary.hero.image} alt="Portrait spread three" className="h-[36vh] md:col-span-7 md:h-[24rem]" />
                  <EditorialImage image={mediaLibrary.booking.image} alt="Portrait spread four" className="h-[36vh] md:col-span-5 md:h-[24rem]" />
                </div>
              </div>
            </section>

            {/* ── Journal Grid ── */}
            {/* id="journal" added so the Journal nav link resolves correctly */}
            <section id="journal" className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <p className="section-label mb-10">WEDDING JOURNAL GRID</p>
                <div className="mb-10 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl">A Living Editorial Archive</h2>
                  <p className="section-copy">
                    Small chapters of movement, devotion, and celebration across destinations.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
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
                      <div className="absolute bottom-2 left-2 border border-[#f0e9dc80] bg-[#1111113a] px-2 py-1 text-[9px] tracking-[0.15em] text-[#f5eee2]">
                        {mediaLibrary.destinations[index % mediaLibrary.destinations.length]}
                      </div>
                    </EditorialImage>
                  ))}
                  <Suspense fallback={<div className="col-span-2 h-56 md:col-span-2 md:h-72 bg-[#f4ebe0]" />}>
                    <EditorialVideoCard
                      item={mediaLibrary.editorialVideoCards[0]}
                      activeVideoId={activeVideoId}
                      setActiveVideoId={setActiveVideoId}
                      className="col-span-2 h-56 md:col-span-2 md:h-72"
                    />
                  </Suspense>
                </div>
              </div>
            </section>

            {/* ── Large Closing Editorial Image ── */}
            <section className="relative px-5 py-28 md:px-12 md:py-36">
              <div className="mx-auto max-w-7xl">
                <EditorialImage
                  image={mediaLibrary.booking.image}
                  alt="Luxury wedding editorial closing image"
                  className="h-[80vh] w-full md:h-[90vh]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
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
              <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
                <div>
                  <p className="text-xs tracking-[0.24em] text-[#1b1b1b]">aathman studios</p>
                  <p className="mt-2 text-[10px] tracking-[0.18em] text-[#8b7864]">Capturing Souls, Not Just Moments</p>
                </div>
                <div className="grid gap-2 text-sm text-[#2a2622]">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#8b7864] transition-colors">
                    Instagram
                  </a>
                  <a href="mailto:hello@aathmanstudios.com" className="hover:text-[#8b7864] transition-colors">
                    hello@aathmanstudios.com
                  </a>
                  <p className="text-xs">India | Europe | Worldwide</p>
                  <p className="text-xs">+91 98765 43210</p>
                </div>
                <nav aria-label="Footer">
                  <ul className="flex flex-col gap-2 text-sm text-[#2a2622] list-none p-0 m-0">
                    <li><a href="#stories" className="hover:text-[#8b7864] transition-colors">Stories</a></li>
                    <li><a href="#films" className="hover:text-[#8b7864] transition-colors">Films</a></li>
                    <li><a href="#begin" className="hover:text-[#8b7864] transition-colors">Contact</a></li>
                  </ul>
                </nav>
              </div>
            </footer>

            {/* ── Booking / Contact ── */}
            <section id="begin" className="relative overflow-hidden px-5 py-20 md:px-12 md:py-28">
              <div className="absolute inset-0">
                <EditorialImage image={mediaLibrary.philosophy.image} alt="Contact backdrop" className="h-full w-full" overlay={false} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f6f1e8]/20 to-[#f6f1e8]/45" />
              <div className="relative mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="mb-16 text-center"
                >
                  <p className="section-label">LET US FRAME YOUR STORY</p>
                  <h2 className="mt-3 text-3xl md:text-4xl text-[#111111]">Where does your forever begin?</h2>
                  <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-[#2a2622]">
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
                      <div className="max-w-2xl mx-auto">
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
                              <div className="w-16 h-px bg-[#8b7864] mx-auto" />
                            </div>

                            <form onSubmit={submitInquiry} className="space-y-8">
                              <div className="max-w-md mx-auto">
                                {currentPrompt.type === 'textarea' ? (
                                  <textarea
                                    required
                                    rows={6}
                                    value={formData[currentPrompt.key]}
                                    onChange={(e) =>
                                      setFormData((prev) => ({ ...prev, [currentPrompt.key]: e.target.value }))
                                    }
                                    className="contact-input resize-none text-lg leading-relaxed"
                                    placeholder={currentPrompt.placeholder}
                                  />
                                ) : currentPrompt.type === 'select' ? (
                                  <select
                                    required
                                    value={formData[currentPrompt.key]}
                                    onChange={(e) =>
                                      setFormData((prev) => ({ ...prev, [currentPrompt.key]: e.target.value }))
                                    }
                                    className="contact-input text-lg"
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
                                      setFormData((prev) => ({ ...prev, [currentPrompt.key]: e.target.value }))
                                    }
                                    className="contact-input text-lg"
                                    placeholder={currentPrompt.placeholder}
                                  />
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-8">
                                <p className="text-xs tracking-[0.18em] text-[#8b7864]">
                                  {step + 1} of {bookingPrompts.length}
                                </p>
                                <motion.button
                                  type="submit"
                                  disabled={status === 'loading'}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
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
