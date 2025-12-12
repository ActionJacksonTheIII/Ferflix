# FerFlix - Personal Media Streaming Platform

A Netflix-style streaming platform for hosting and sharing your personal movie and TV show collection.

## Features

- 🎬 **Personal Media Library**: Upload and organize your entire movie collection
- 📺 **HD Streaming**: Up to 4K resolution with adaptive bitrate
- 🔍 **Advanced Search**: Real-time search with filtering by genre, year, rating
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⭐ **Watchlist Management**: Save favorites and track viewing progress
- 📊 **Analytics Dashboard**: View your streaming statistics and preferences
- 🎨 **Modern UI**: Cinematic design with smooth animations and effects
- ⚡ **Fast Performance**: Optimized loading with lazy loading and caching

## Tech Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Animations**: Anime.js, Pixi.js, Typed.js, Splitting.js
- **Charts**: ECharts.js for analytics visualization
- **Carousel**: Splide.js for smooth content scrolling
- **Deployment**: Vercel (optimized for static sites)

## Project Structure

```
├── index.html          # Main landing page with hero and featured content
├── library.html        # Browse all movies with advanced filtering
├── watch.html          # Video player interface
├── main.js            # Core JavaScript functionality
├── resources/         # Media assets and images
│   └── hero-streaming.jpg
└── README.md          # This file
```

## Getting Started

### Local Development

1. **Clone or download** the project files
2. **Navigate** to the project directory
3. **Start a local server**:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
4. **Open** http://localhost:8000 in your browser

### Deployment to Vercel

#### Option 1: Direct Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Follow prompts** to link your project

#### Option 2: GitHub + Vercel Integration

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - StreamVault streaming platform"
   git remote add origin https://github.com/YOUR_USERNAME/streamvault.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your StreamVault repository
   - Deploy (Vercel will auto-detect and configure)

#### Option 3: Manual Vercel Configuration

1. **Create `vercel.json`** in project root:
   ```json
   {
     "version": 2,
     "name": "streamvault",
     "builds": [
       {
         "src": "index.html",
         "use": "@vercel/static"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/$1"
       }
     ]
   }
   ```

2. **Deploy using CLI**:
   ```bash
   vercel --prod
   ```

## Configuration

### Customization Options

- **Movie Database**: Edit `main.js` to add your own movie collection
- **Colors**: Modify Tailwind config in each HTML file
- **Animations**: Adjust timing and effects in `main.js`
- **Content**: Replace placeholder images in the resources folder

### Environment Variables

No environment variables required - this is a static site that works out of the box.

## Usage

### Adding Your Content

1. **Upload your movies** to a cloud storage service (AWS S3, Google Cloud, etc.)
2. **Update the movie database** in `main.js` with your content
3. **Add metadata** including titles, descriptions, posters, and streaming URLs
4. **Deploy** your updated site

### Features Overview

- **Homepage**: Featured movies, statistics, and platform features
- **Library**: Browse, search, and filter your entire collection
- **Watch Page**: Full-featured video player with custom controls
- **Watchlist**: Save movies for later viewing
- **Analytics**: Track your viewing habits and preferences

## Performance Optimizations

- ✅ Lazy loading for images and content
- ✅ Optimized animations (60fps)
- ✅ Responsive images with proper sizing
- ✅ Minimal JavaScript bundle
- ✅ CSS and JS minification ready
- ✅ Static generation compatible

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for personal use. Feel free to modify and adapt for your own media collection.

## Support

For issues or questions:
1. Check browser console for errors
2. Ensure all files are properly uploaded
3. Verify image URLs are accessible
4. Test on different devices and browsers

---

**StreamVault** - Your personal media universe, beautifully organized and instantly accessible.
