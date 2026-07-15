// ---------------------------------------------------------------------------
// media.js  —  Aathman Studios asset registry
// ---------------------------------------------------------------------------
// HOW TO USE LOCAL ASSETS (recommended for production):
//   1. Place files under src/assets/…
//   2. Import them at the top of this file, e.g.:
//        import heroImage from '../assets/images/hero/DSC07761-copy.jpg'
//   3. Reference the imported identifier in the object below.
//
// Relative string paths like 'src/assets/…' do NOT work in Vite production
// builds — they resolve against the document root, not the module graph.
// Import the file so Vite fingerprints & bundles it correctly.
// ---------------------------------------------------------------------------

// -- Uncomment and adjust these imports once the asset files are in place: --
import heroImage        from '../assets/images/hero/hero.webp'
import portraitM1       from '../assets/images/portraits/portrait1.webp'
import portraitM2       from '../assets/images/portraits/DSC07621.webp'
import portraitM3       from '../assets/images/portraits/DSC06445.jpg'
import portraitM4       from '../assets/images/portraits/DSC08294.jpg'
import portraitM5       from '../assets/images/portraits/DSC09441.jpg'
import portraitM6       from '../assets/images/portraits/DSC08023.jpg'
import portraitM7       from '../assets/images/portraits/DSC09221.jpg'
//mosaic images
import mos2       from '../assets/images/portraits/DSC08353.jpg'
import mos4       from '../assets/images/portraits/DSC08195.jpg'
import mos5       from '../assets/images/portraits/DSC07639 copy.jpg'
import mosaic_gif        from '../assets/images/portraits/04.mp4'
// import bwA1             from '../assets/images/bw/a1.jpg'
// import bwPdsPost        from '../assets/images/bw/PDS POST.jpg'
import logo           from '../assets/images/aathman_logo.png' // Placeholder until a real GIF is created from the video
import last_big       from '../assets/images/portraits/DSC09490.webp'
//BLACK AND WHITE SECTION IMAGES
import bw1            from '../assets/images/bw/a1.webp'
import bw2            from '../assets/images/bw/a3.webp'
import bw3            from '../assets/images/bw/b3.webp'
import bw4            from '../assets/images/portraits/DSC02273.jpg'
import bw5            from '../assets/images/portraits/DSC08269.jpg'
import portrait_port  from '../assets/images/portraits/port.webp'
import portrait_port1  from '../assets/images/portraits/DSC08773.webp'

//destination wedding
import dest1          from '../assets/images/portraits/DSC08381.jpg'
import dest2          from '../assets/images/portraits/DSC07432.jpg'
import dest3          from '../assets/images/portraits/DSC08683.jpg'
import dest4          from '../assets/images/portraits/DSC08338.jpg'

//Closing Video
import close          from '../assets/videos/abel.mp4'
import thumbnail      from '../assets/images/portraits/thumbnail.png'

//VIDEOS
import video1         from '../assets/videos/01.mp4'
import video2         from '../assets/videos/02_.mp4'
import video3         from '../assets/videos/05.mp4'
import video4         from '../assets/videos/06.mp4'
import video5         from '../assets/videos/01_.mp4'
import video6         from '../assets/videos/07.mp4'
import video7         from '../assets/videos/08.mp4'

//hierloom
import heirloom1      from '../assets/images/portraits/1.jpg'
import heirloom2      from '../assets/images/portraits/2.jpg'
import heirloom3      from '../assets/images/portraits/3.jpg'
import heirloom4      from '../assets/images/portraits/4.jpg'


// Temporary Pexels placeholders used until local assets are imported above.
const _HERO_IMAGE    = heroImage
const _MOS_2         = mos2
const _MOS_4         = mos4
const _MOS_5         = mos5
const _PORTRAIT_M1   = portraitM1
const _PORTRAIT_M2   = portraitM2
const _port_         = portrait_port
const _port_1        = portrait_port1
const _BW_PDS_POST   = 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800'
const _LOGO_GIF      = mosaic_gif
const _LOGO          = logo
const _LAST_BIG       = last_big
const _BW_1        = bw1
const _BW_2        = bw2
const _BW_3        = bw3
const _BW_4        = bw4
const _BW_5        = bw5
const _DS_1        = dest1
const _DS_2        = dest2
const _DS_3        = dest3
const _DS_4        = dest4
const _port_2      = portraitM3
const _port_3      = portraitM4
const _port_4      = portraitM5
const _port_5      = portraitM6
const _port_6      = portraitM7
const _CLOSE       = close
const _THUMB       = thumbnail
const _MOSAIC_GIF  = mosaic_gif
//videos
const _VIDEO_1     = video1
const _VIDEO_2     = video2
const _VIDEO_3     = video3
const _VIDEO_4     = video4
const _VIDEO_5     = video5
const _VIDEO_6     = video6
const _VIDEO_7     = video7
//hireloom
const _HEIRLOOM_1  = heirloom1
const _HEIRLOOM_2  = heirloom2
const _HEIRLOOM_3  = heirloom3
const _HEIRLOOM_4  = heirloom4


// Splash video — replace with your own hosted asset when available.
const _SPLASH_VIDEO  = ''

export const mediaLibrary = {
  splash: {
    // poster: a static frame shown before the video loads.
    // Set this to an imported image or a public-folder URL; undefined causes
    // a browser warning on the <video> element.
    video: _SPLASH_VIDEO,
  },

  hero: {
    image: _HERO_IMAGE,
    // "layered" was referenced in App.jsx but never defined — using hero image
    // as a safe fallback so nothing renders blank.
    layered: _HERO_IMAGE,
    blackAndWhite: true,
  },

  philosophy: {
    image: _port_,
    image1: _port_6,
    image2: _DS_3,
    image3: _BW_5,
  },

  mosaic: [
    { id: 'm1', image: _port_3 },
    { id: 'm2', image: _MOS_2 },
    { id: 'm3', image: _port_4 },
    { id: 'm4', image: _MOS_4 },
    { id: 'm5', image: _MOS_5 },
    { id: 'm6', image:  _port_1},
  ],

  films: [
    {
      id: 'film-monsoon-vows',
      title: 'The Beginning of Forever',
      couple: 'S&M',
      location: 'Bengaluru',
      year: '2026',
      runtime: '04:12',
      phrase: 'An evening wrapped in silence and light.',
      video: video6,
    },
    {
      id: 'film-forever-in-bloom',
      title: 'Forever, Tenderly Told',
      couple: 'S&M',
      location: 'Bengaluru',
      year: '2026',
      runtime: '05:01',
      phrase: 'Sea air, soft laughter, and a midnight first dance.',
      video: video7,
    },
  ],

  editorialVideoCards: [
    {
      id: 'hero-film',
      title: 'Haldi',
      couple: 'AxR',
      location: 'Bengaluru',
      year: '2025',
      runtime: '02:58',
      phrase: 'Feel the Maanja in the air.',
      image: logo,
      video: mosaic_gif,
    },
    {
      id: 'paired-one',
      title: 'The Cinema of Love',
      couple: '',
      location: '',
      year: '2025',
      runtime: '',
      phrase: 'where memories becomes legacy and love becomes a story.',
      video: _VIDEO_4,
    },
    {
      id: 'paired-two',
      title: 'Love, Curated',
      couple: '',
      location: '',
      year: '2025',
      runtime: '',
      phrase: 'Quiet laughter beneath drifting joy.',
      video: _VIDEO_3,
    },
    {
      id: 'paired-three',
      title: 'Monochrome Motion',
      couple: 'Sara & Vihaan',
      location: 'Tuscany',
      year: '2023',
      runtime: '04:09',
      phrase: 'A quiet black-and-white film to anchor the sequence.',
      video: _VIDEO_2,
    },
  ],

  stories: [
    {
      title: 'The Sacred Mark',
      image: _DS_1,
    },
    {
      title: 'Before Forever',
      video: _VIDEO_5,
    },
  ],

  monochrome: [
    _BW_4,
    _BW_1,
    _BW_5,
  ],

  journal: [
    _MOS_2,
    _MOS_4,
    _port_4,
    _DS_1,
    _BW_5,
    _MOS_5,
    _BW_1,
    _BW_4,
    _port_3,
    _DS_2,
    _HEIRLOOM_3,
    _HEIRLOOM_1,
  ],

  closing: {
    video: _CLOSE,
    image: _THUMB,
  },

  destinations: ['Banglore', 'Goa', 'Tamil Nadu'],

  booking: {
    image: _LAST_BIG,
    image1:_DS_4,
  },

  LOGO: {
    gif: _LOGO_GIF,
    image: _LOGO,
  },

  santosh: {
    image1: _HEIRLOOM_1,
    image2: _HEIRLOOM_2,
    image3: _HEIRLOOM_3,
    image4: _HEIRLOOM_4,
  }
}


