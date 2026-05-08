// Replace placeholder URLs with real Aathman Studios assets.
// Preferred: import local files from src/assets/... and map them below.
// Example:
// import heroImage from '../assets/images/hero/hero-01.webp'
// import heroVideo from '../assets/videos/hero/hero-loop.mp4'

import heroImage from '../assets/images/hero/DSC07761-copy.jpg'

export const mediaLibrary = {
  splash: {
    video:
      'https://player.vimeo.com/external/434045526.sd.mp4?s=88e69b3d9a3f0e91618f5f54e4fcb4f252682f49&profile_id=164&oauth2_token_id=57447761',
  },
  hero: {
    image: heroImage,
    blackAndWhite: true, // toggle true if needed
  },
  philosophy: {
    image:
      'https://images.pexels.com/photos/2659360/pexels-photo-2659360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
  },
  mosaic: [
    { id: 'm1', image: 'src/assets/images/portraits/DSC07519.jpg.jpeg' },
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
      video:
        'https://player.vimeo.com/external/411625999.sd.mp4?s=f131f451ecf43c59ea49f892fd0ccca16b679ec7&profile_id=164&oauth2_token_id=57447761',
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
      video:
        'https://player.vimeo.com/external/377508802.sd.mp4?s=63f3ca61f6f485f50f68c774f06f9f2f8efde6cd&profile_id=164&oauth2_token_id=57447761',
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
      video:
        'https://player.vimeo.com/external/434045526.sd.mp4?s=88e69b3d9a3f0e91618f5f54e4fcb4f252682f49&profile_id=164&oauth2_token_id=57447761',
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
      image: 'https://images.pexels.com/photos/3532558/pexels-photo-3532558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=2200',
      video:
        'https://player.vimeo.com/external/411625999.sd.mp4?s=f131f451ecf43c59ea49f892fd0ccca16b679ec7&profile_id=164&oauth2_token_id=57447761',
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
      video:
        'https://player.vimeo.com/external/377508802.sd.mp4?s=63f3ca61f6f485f50f68c774f06f9f2f8efde6cd&profile_id=164&oauth2_token_id=57447761',
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
      video:
        'https://player.vimeo.com/external/434045526.sd.mp4?s=88e69b3d9a3f0e91618f5f54e4fcb4f252682f49&profile_id=164&oauth2_token_id=57447761',
    },
  ],
  stories: [
    { title: 'The Saffron Morning', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800' },
    { title: 'Letters Under Lanterns', image: 'https://images.pexels.com/photos/1779418/pexels-photo-1779418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800' },
  ],
  monochrome: [
    'https://images.pexels.com/photos/1779418/pexels-photo-1779418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=1800',
    'src/assets/images/bw/a1.jpg.jpeg',
    'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1300&w=1800',
  ],
  destinations: ['Lake Como', 'Jaipur', 'Udaipur', 'Tuscany', 'Santorini', 'Mussoorie'],
  booking: {
    image:
      'src/assets/images/bw/PDS POST.jpg.jpeg',
  },
}
