# Aathman Studios Asset Map

Replace placeholder URLs in `src/data/media.js` with your real local files.

Recommended production formats:
- Images: WebP (`.webp`)
- Videos: MP4/WebM (`.mp4`, `.webm`)

Folder usage:
- `src/assets/images/hero/` -> homepage hero images
- `src/assets/images/weddings/` -> wedding story photographs
- `src/assets/images/portraits/` -> portrait spread imagery
- `src/assets/images/destination/` -> destination wedding imagery
- `src/assets/images/bw/` -> black and white sequences
- `src/assets/images/editorial/` -> editorial grid images
- `src/assets/videos/films/` -> signature film assets
- `src/assets/videos/reels/` -> shorter reels/previews
- `src/assets/videos/hero/` -> hero opener video loops

Example usage in `src/data/media.js`:

```js
import hero01 from '../assets/images/hero/hero-01.webp'
import film01Poster from '../assets/images/editorial/film-01-poster.webp'
import film01Video from '../assets/videos/films/film-01.mp4'
```

Then assign:

```js
hero: { image: hero01 }
films: [{ image: film01Poster, video: film01Video }]
```

Note:
- This project currently uses curated placeholder media URLs.
- Replace them with real Aathman Studios assets for launch.
