# Easter Egg Meme - Features

## Current Implementation

### 1. Interactive Easter Egg
- Click the egg to make it crack and explode
- Egg splits into top and bottom halves with animation
- Shows pop counter (X/5) below the egg

### 2. Explosion Effects (Every Click)
- **70 meme images** pop up and fall down with rotation
- **200 confetti pieces** in various colors shoot up and fall
- **100 particle burst** radiates from the center
- All with smooth cubic-bezier easing for realistic physics

### 3. Pop Counter System
- Tracks number of times egg has been popped
- Displays count as "(X/5)" under the egg
- Triggers special mode on 5th pop

### 4. Special Mode (5th Pop)
- **Music plays** (looping) - Add `easter-music.mp3` to `/public` folder
- **Center meme orbits** around the screen in a circular path
- **"PARTY MODE ACTIVATED!"** message appears at top
- **Continues indefinitely** until page refresh
- All subsequent pops still create explosions

### 5. Background Animations
- **Falling eggs** (🥚🐣🐰) continuously fall from top to bottom
- **Pulsing light beams** in yellow, pink, purple, blue
- **Floating pastel eggs** with gentle motion
- **Floating icons** (flowers and leaves)

### 6. Auto-Reset
- Each explosion auto-resets after 10 seconds
- Allows continuous clicking
- Pop count persists across resets

### 7. Easter Message
- "Appo ellarkkum Easter Ashhamsakal!! 🐰🎉"
- Appears 1.5 seconds after egg cracks
- Hidden during special mode (replaced by party message)

## How to Use

1. **Add Music File**
   - Place your music file in `public/easter-music.mp3`
   - Supported formats: MP3, WAV, OGG

2. **Start Development Server**
   ```bash
   cd easter-egg-meme
   pnpm dev
   ```

3. **Open Browser**
   - Navigate to http://localhost:3000
   - Click the egg to start!

4. **Reach Special Mode**
   - Click the egg 5 times
   - Music will start playing
   - Center meme will orbit around screen
   - Keep clicking for continuous explosions!

## File Structure

```
easter-egg-meme/
├── app/
│   ├── components/
│   │   └── easteregg.tsx    # Main interactive component
│   ├── page.tsx              # Home page with background animations
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Animations and styles
├── public/
│   ├── mem1.png              # Meme images
│   ├── mem2.png
│   ├── mem3.png
│   └── easter-music.mp3      # ADD YOUR MUSIC HERE
└── package.json
```

## Customization

### Change Pop Count Threshold
In `easteregg.tsx`, line ~49:
```typescript
if (newPopCount === 5) {  // Change 5 to any number
```

### Change Music File
In `easteregg.tsx`, line ~52:
```typescript
const audio = new Audio('/easter-music.mp3');  // Change filename
```

### Adjust Orbit Speed
In `globals.css`, line ~26:
```css
animation: orbit 8s ease-in-out infinite;  // Change 8s to any duration
```

### Modify Explosion Counts
In `easteregg.tsx`:
- Line ~58: `const memeCount = 70;`
- Line ~72: `const confettiCount = 200;`
- Line ~88: `const particleCount = 100;`

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Touch events supported

## Notes

- Music requires user interaction to play (browser security)
- Special mode persists until page refresh
- All animations use CSS for optimal performance
- Background animations run continuously
