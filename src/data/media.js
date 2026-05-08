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
// import bwA1             from '../assets/images/bw/a1.jpg'
// import bwPdsPost        from '../assets/images/bw/PDS POST.jpg'
import giflogo              from '../assets/videos/Logo Animation 4K.mp4'
import logo           from '../assets/images/aathman_logo.png' // Placeholder until a real GIF is created from the video

// Temporary Pexels placeholders used until local assets are imported above.
const _HERO_IMAGE    = heroImage
const _PORTRAIT_M1   = portraitM1
const _BW_A1         = 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=1800'
const _BW_PDS_POST   = 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800'
const _LOGO_GIF      = giflogo
const _LOGO          = logo

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
    image: 'https://images.pexels.com/photos/2659360/pexels-photo-2659360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
  },

  mosaic: [
    { id: 'm1', image: _PORTRAIT_M1 },
    { id: 'm2', image: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1600' },
    { id: 'm3', image: 'https://images.pexels.com/photos/3137072/pexels-photo-3137072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1600&w=1200' },
    { id: 'm4', image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800' },
    { id: 'm5', image: 'https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1100' },
    { id: 'm6', image: 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1700' },
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
      phrase: 'Temple bells and silk in golden hush.',
      image: 'https://images.pexels.com/photos/2659360/pexels-photo-2659360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
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
      title: 'The Saffron Morning',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
    },
    {
      title: 'Letters Under Lanterns',
      image: 'https://images.pexels.com/photos/1779418/pexels-photo-1779418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
    },
  ],

  monochrome: [
    'https://images.pexels.com/photos/1779418/pexels-photo-1779418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=1800',
    _BW_A1,
    'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=1800',
  ],

  destinations: ['Lake Como', 'Jaipur', 'Udaipur', 'Tuscany', 'Santorini', 'Mussoorie'],

  booking: {
    image: _BW_PDS_POST,
  },
}
