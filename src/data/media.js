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

// import bwA1             from '../assets/images/bw/a1.jpg'
// import bwPdsPost        from '../assets/images/bw/PDS POST.jpg'
import giflogo              from '../assets/videos/Logo Animation 4K.mp4'
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



// Temporary Pexels placeholders used until local assets are imported above.
const _HERO_IMAGE    = heroImage
const _PORTRAIT_M1   = portraitM1
const _PORTRAIT_M2   = portraitM2
const _port_         = portrait_port
const _port_1        = portrait_port1
const _BW_PDS_POST   = 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800'
const _LOGO_GIF      = giflogo
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


// Splash video — replace with your own hosted asset when available.
const _SPLASH_VIDEO  = 'https://player.vimeo.com/external/434045526.sd.mp4?s=88e69b3d9a3f0e91618f5f54e4fcb4f252682f49&profile_id=164&oauth2_token_id=57447761'

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
    { id: 'm2', image: _port_2 },
    { id: 'm3', image: _port_4 },
    { id: 'm4', image: _port_ },
    { id: 'm5', image: _port_5 },
    { id: 'm6', image:  _port_1},
  ],

  films: [
    {
      id: 'film-monsoon-vows',
      title: 'Monsoon Vows',
      couple: 'Aarav & Meher',
      location: 'Udaipur',
      year: '2025',
      runtime: '04:12',
      phrase: 'An evening wrapped in silence and light.',
      image: 'https://images.pexels.com/photos/934083/pexels-photo-934083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=2000',
      video: 'https://player.vimeo.com/external/411625999.sd.mp4?s=f131f451ecf43c59ea49f892fd0ccca16b679ec7&profile_id=164&oauth2_token_id=57447761',
    },
    {
      id: 'film-whispers-at-dusk',
      title: 'Whispers At Dusk',
      couple: 'Ira & Ved',
      location: 'Jaipur',
      year: '2024',
      runtime: '03:48',
      phrase: 'Where jasmine winds met handwritten vows.',
      image: 'https://images.pexels.com/photos/2781104/pexels-photo-2781104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=2000',
      video: 'https://player.vimeo.com/external/377508802.sd.mp4?s=63f3ca61f6f485f50f68c774f06f9f2f8efde6cd&profile_id=164&oauth2_token_id=57447761',
    },
    {
      id: 'film-forever-in-bloom',
      title: 'Forever In Bloom',
      couple: 'Rhea & Kabir',
      location: 'Goa',
      year: '2023',
      runtime: '05:01',
      phrase: 'Sea air, soft laughter, and a midnight first dance.',
      image: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=2000',
      video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=88e69b3d9a3f0e91618f5f54e4fcb4f252682f49&profile_id=164&oauth2_token_id=57447761',
    },
  ],

  editorialVideoCards: [
    {
      id: 'hero-film',
      title: 'The First Light',
      couple: 'Aanya & Dev',
      location: 'Lake Como',
      year: '2025',
      runtime: '02:58',
      phrase: 'A dawn promise held between breath and water.',
      image: logo,
      video: giflogo,
    },
    {
      id: 'paired-one',
      title: 'Sacred Reverie',
      couple: 'Mira & Arjun',
      location: 'Jaipur',
      year: '2024',
      runtime: '03:31',
      phrase: 'Video 1',
      image: _LOGO,
      video: 'https://player.vimeo.com/external/377508802.sd.mp4?s=63f3ca61f6f485f50f68c774f06f9f2f8efde6cd&profile_id=164&oauth2_token_id=57447761',
    },
    {
      id: 'paired-two',
      title: 'After The Vows',
      couple: 'Sara & Vihaan',
      location: 'Tuscany',
      year: '2023',
      runtime: '04:09',
      phrase: 'Quiet laughter beneath drifting lanterns.',
      image: 'https://images.pexels.com/photos/3137074/pexels-photo-3137074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
      video: logo,
    },
  ],

  stories: [
    {
      title: 'The Sacred Mark',
      image: _DS_1,
    },
    {
      title: 'Before Forever',
      image: _DS_2,
    },
  ],

  monochrome: [
    _BW_4,
    _BW_1,
    _BW_5,
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
}


