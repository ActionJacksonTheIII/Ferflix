// StreamVault - Main JavaScript File
// Comprehensive media streaming platform functionality

// Global variables and state management
let currentPage = window.location.pathname.split('/').pop() || 'index.html';
let movieDatabase = [];
let filteredMovies = [];
let currentMovie = null;
let watchlist = JSON.parse(localStorage.getItem('streamvault-watchlist') || '[]');
let videoPlayer = null;
let isPlaying = false;
let currentTime = 0;
let duration = 0;

// Mock movie database with comprehensive data
const mockMovies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: ["Sci-Fi", "Action", "Thriller"],
        rating: 8.8,
        duration: "148 min",
        poster: "https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/2a8b30e62e54690b3698d3f61ef16b2b85ef8b9a.jpg",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
        director: "Christopher Nolan",
        featured: true,
        recent: true,
        trending: true
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        genre: ["Action", "Crime", "Drama"],
        rating: 9.0,
        duration: "152 min",
        poster: "https://kimi-web-img.moonshot.cn/img/startuppakistan.com.pk/37706d0aacb381ab20c01405ef2c944cd9122030.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        director: "Christopher Nolan",
        featured: true,
        trending: true
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genre: ["Sci-Fi", "Drama", "Adventure"],
        rating: 8.6,
        duration: "169 min",
        poster: "https://kimi-web-img.moonshot.cn/img/wowtovisit.com/f6db3e36d6e45d65745960d21cefa0c6c19c7a02.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        director: "Christopher Nolan",
        featured: true,
        recent: true
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        genre: ["Crime", "Drama"],
        rating: 8.9,
        duration: "154 min",
        poster: "https://kimi-web-img.moonshot.cn/img/businessmirror.com.ph/23b32557b49ed867822f13b6f9b3d7c507a181b8.jpeg",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
        director: "Quentin Tarantino",
        trending: true
    },
    {
        id: 5,
        title: "The Matrix",
        year: 1999,
        genre: ["Sci-Fi", "Action"],
        rating: 8.7,
        duration: "136 min",
        poster: "https://kimi-web-img.moonshot.cn/img/hips.hearstapps.com/b35579f32f20cbc747392c9be0f29835d8bd982a.jpg",
        description: "A computer programmer discovers that reality as he knows it is a simulation created by machines.",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        director: "The Wachowskis",
        recent: true
    },
    {
        id: 6,
        title: "Forrest Gump",
        year: 1994,
        genre: ["Drama", "Romance"],
        rating: 8.8,
        duration: "142 min",
        poster: "https://kimi-web-img.moonshot.cn/img/framerusercontent.com/9de2765f1f1067e0d7d65954ba043e1c23e430ae.webp",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
        cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
        director: "Robert Zemeckis"
    },
    {
        id: 7,
        title: "The Shawshank Redemption",
        year: 1994,
        genre: ["Drama"],
        rating: 9.3,
        duration: "142 min",
        poster: "https://kimi-web-img.moonshot.cn/img/vejasp.abril.com.br/aa727af26fd5b0f944be2e22703ffb7d5ef6436d.jpeg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        director: "Frank Darabont",
        trending: true
    },
    {
        id: 8,
        title: "Fight Club",
        year: 1999,
        genre: ["Drama", "Thriller"],
        rating: 8.8,
        duration: "139 min",
        poster: "https://kimi-web-img.moonshot.cn/img/s.hdnux.com/5653a162e7bee91f9e7ffd82f0802cd9e941fa77.jpg",
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
        cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
        director: "David Fincher",
        recent: true
    },
    {
        id: 9,
        title: "Avatar",
        year: 2009,
        genre: ["Sci-Fi", "Adventure", "Action"],
        rating: 7.9,
        duration: "162 min",
        poster: "https://kimi-web-img.moonshot.cn/img/galalitescreens.com/a64f4c69bc90abd253e843535c5a60beddf5d602.webp",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world.",
        cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
        director: "James Cameron",
        featured: true
    },
    {
        id: 10,
        title: "Titanic",
        year: 1997,
        genre: ["Romance", "Drama", "Disaster"],
        rating: 7.9,
        duration: "194 min",
        poster: "https://kimi-web-img.moonshot.cn/img/img3.jiemian.com/bc2ca9711f2b2b5546d48ff8c0e6983726b781f3.png",
        description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
        cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
        director: "James Cameron"
    },
    {
        id: 11,
        title: "Jurassic Park",
        year: 1993,
        genre: ["Sci-Fi", "Adventure", "Thriller"],
        rating: 8.1,
        duration: "127 min",
        poster: "https://kimi-web-img.moonshot.cn/img/thevendry.com/36a4f682ed1105fdea7f424a66ddeac5be7a80a5.jpg",
        description: "A pragmatic Paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids.",
        cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
        director: "Steven Spielberg",
        trending: true
    },
    {
        id: 12,
        title: "The Godfather",
        year: 1972,
        genre: ["Crime", "Drama"],
        rating: 9.2,
        duration: "175 min",
        poster: "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/6e5389f389d1c733f8a2afb01f6b97152105a38f.jpg",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"],
        director: "Francis Ford Coppola"
    },
    {
        id: 13,
        title: "Casablanca",
        year: 1942,
        genre: ["Romance", "Drama", "War"],
        rating: 8.5,
        duration: "102 min",
        poster: "https://kimi-web-img.moonshot.cn/img/legacybox.com/13810c5694177e7290432ba4bf68713a565ed772.jpg",
        description: "A cynical American expatriate struggles to decide whether or not he should help his former lover and her fugitive husband escape French Morocco.",
        cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"],
        director: "Michael Curtiz"
    },
    {
        id: 14,
        title: "2001: A Space Odyssey",
        year: 1968,
        genre: ["Sci-Fi", "Mystery", "Adventure"],
        rating: 8.3,
        duration: "149 min",
        poster: "https://kimi-web-img.moonshot.cn/img/www.hollywoodreporter.com/1ee0eb2119bd55904af19330d811aa430b152a1e.jpg",
        description: "After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins.",
        cast: ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
        director: "Stanley Kubrick",
        recent: true
    },
    {
        id: 15,
        title: "Blade Runner 2049",
        year: 2017,
        genre: ["Sci-Fi", "Thriller", "Mystery"],
        rating: 8.0,
        duration: "164 min",
        poster: "https://kimi-web-img.moonshot.cn/img/images.adsttc.com/e416d4222482475b37a1764b274aa7162e139eee.jpg",
        description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
        cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
        director: "Denis Villeneuve",
        featured: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    movieDatabase = [...mockMovies];
    filteredMovies = [...movieDatabase];
    
    initializePage();
    setupEventListeners();
    initializeAnimations();
});

// Page initialization
function initializePage() {
    if (currentPage === 'index.html' || currentPage === '') {
        initializeHomePage();
    } else if (currentPage === 'library.html') {
        initializeLibraryPage();
    } else if (currentPage === 'watch.html') {
        initializeWatchPage();
    }
}

// Home page initialization
function initializeHomePage() {
    setupHeroAnimations();
    setupFeaturedCarousel();
    setupRecentCarousel();
    setupStatsCounters();
    setupAnalyticsCharts();
}

// Hero animations
function setupHeroAnimations() {
    // Typewriter effect for hero text
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Stream your entire movie collection',
                'Share content with friends and family',
                'Discover new favorites every day',
                'Access your media from anywhere'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Floating particles effect
    if (document.getElementById('particles-container')) {
        createFloatingParticles();
    }
}

// Create floating particles background
function createFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // Create PIXI application
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        backgroundAlpha: 0
    });
    
    container.appendChild(app.view);
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new PIXI.Graphics();
        particle.beginFill(0x00d4ff, 0.3);
        particle.drawCircle(0, 0, Math.random() * 3 + 1);
        particle.endFill();
        
        particle.x = Math.random() * app.screen.width;
        particle.y = Math.random() * app.screen.height;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        
        app.stage.addChild(particle);
        particles.push(particle);
    }
    
    // Animate particles
    app.ticker.add(() => {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0) particle.x = app.screen.width;
            if (particle.x > app.screen.width) particle.x = 0;
            if (particle.y < 0) particle.y = app.screen.height;
            if (particle.y > app.screen.height) particle.y = 0;
        });
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
}

// Setup featured movies carousel
function setupFeaturedCarousel() {
    const carousel = document.getElementById('featured-carousel');
    const moviesList = document.getElementById('featured-movies');
    
    if (!carousel || !moviesList) return;
    
    const featuredMovies = movieDatabase.filter(movie => movie.featured);
    moviesList.innerHTML = featuredMovies.map(movie => createCarouselItem(movie)).join('');
    
    new Splide('#featured-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 }
        }
    }).mount();
}

// Setup recent movies carousel
function setupRecentCarousel() {
    const moviesList = document.getElementById('recent-movies');
    
    if (!moviesList) return;
    
    const recentMovies = movieDatabase.filter(movie => movie.recent);
    moviesList.innerHTML = recentMovies.map(movie => createCarouselItem(movie)).join('');
    
    new Splide('#recent-carousel', {
        type: 'loop',
        perPage: 5,
        perMove: 1,
        gap: '1.5rem',
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        breakpoints: {
            1280: { perPage: 4 },
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 }
        }
    }).mount();
}

// Create carousel item HTML
function createCarouselItem(movie) {
    return `
        <li class="splide__slide">
            <div class="movie-card rounded-lg overflow-hidden cursor-pointer" data-movie-id="${movie.id}">
                <div class="relative">
                    <img src="${movie.poster}" alt="${movie.title}" class="w-full h-64 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute bottom-4 left-4 right-4">
                            <h3 class="text-lg font-bold mb-2">${movie.title}</h3>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-300">${movie.year}</span>
                                <span class="text-yellow-400">★ ${movie.rating}</span>
                            </div>
                            <button class="mt-2 bg-electric-blue text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition-all">
                                Watch Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `;
}

// Setup stats counters animation
function setupStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Setup analytics charts
function setupAnalyticsCharts() {
    // Watch time chart
    const watchTimeChart = echarts.init(document.getElementById('watch-time-chart'));
    if (watchTimeChart) {
        const watchTimeOption = {
            backgroundColor: 'transparent',
            textStyle: { color: '#ffffff' },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(26, 26, 26, 0.9)',
                borderColor: '#00d4ff',
                textStyle: { color: '#ffffff' }
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: { lineStyle: { color: '#666' } },
                axisLabel: { color: '#999' }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#666' } },
                axisLabel: { color: '#999' },
                splitLine: { lineStyle: { color: '#333' } }
            },
            series: [{
                data: [2.5, 3.2, 4.1, 3.8, 5.2, 6.8, 4.9],
                type: 'line',
                smooth: true,
                lineStyle: { color: '#00d4ff', width: 3 },
                itemStyle: { color: '#00d4ff' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                            { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                        ]
                    }
                }
            }]
        };
        watchTimeChart.setOption(watchTimeOption);
    }
    
    // Genre preferences chart
    const genreChart = echarts.init(document.getElementById('genre-chart'));
    if (genreChart) {
        const genreOption = {
            backgroundColor: 'transparent',
            textStyle: { color: '#ffffff' },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(26, 26, 26, 0.9)',
                borderColor: '#00d4ff',
                textStyle: { color: '#ffffff' }
            },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    { value: 35, name: 'Sci-Fi', itemStyle: { color: '#00d4ff' } },
                    { value: 25, name: 'Action', itemStyle: { color: '#ffb700' } },
                    { value: 20, name: 'Drama', itemStyle: { color: '#10b981' } },
                    { value: 15, name: 'Comedy', itemStyle: { color: '#f59e0b' } },
                    { value: 5, name: 'Horror', itemStyle: { color: '#ef4444' } }
                ],
                label: { color: '#ffffff' },
                labelLine: { lineStyle: { color: '#666' } }
            }]
        };
        genreChart.setOption(genreOption);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (watchTimeChart) watchTimeChart.resize();
        if (genreChart) genreChart.resize();
    });
}

// Library page initialization
function initializeLibraryPage() {
    renderMovies();
    setupLibraryFilters();
    setupSearchFunctionality();
    setupViewToggle();
}

// Render movies in grid
function renderMovies() {
    const container = document.getElementById('movies-container');
    if (!container) return;
    
    container.innerHTML = filteredMovies.map(movie => createMovieCard(movie)).join('');
    updateResultsCount();
    
    // Add stagger animation
    const cards = container.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-up', `stagger-delay-${(index % 4) + 1}`);
    });
}

// Create movie card HTML
function createMovieCard(movie) {
    const isInWatchlist = watchlist.includes(movie.id);
    const stars = '★'.repeat(Math.floor(movie.rating / 2)) + '☆'.repeat(5 - Math.floor(movie.rating / 2));
    
    return `
        <div class="movie-card rounded-lg overflow-hidden cursor-pointer fade-in-up" data-movie-id="${movie.id}">
            <div class="relative">
                <img src="${movie.poster}" alt="${movie.title}" class="w-full h-80 object-cover movie-poster">
                <div class="absolute top-2 right-2">
                    <button class="watchlist-btn ${isInWatchlist ? 'text-electric-blue' : 'text-white'} bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all" data-movie-id="${movie.id}">
                        <svg class="w-4 h-4" fill="${isInWatchlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 right-4">
                        <button class="w-full bg-electric-blue text-white py-2 rounded-lg hover:bg-opacity-80 transition-all mb-2">
                            Watch Now
                        </button>
                        <button class="w-full bg-white bg-opacity-20 text-white py-2 rounded-lg hover:bg-opacity-30 transition-all">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2 truncate">${movie.title}</h3>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-400">${movie.year}</span>
                    <span class="text-yellow-400 text-sm">${stars} ${movie.rating}</span>
                </div>
                <div class="flex flex-wrap gap-1">
                    ${movie.genre.slice(0, 2).map(genre => 
                        `<span class="genre-tag px-2 py-1 rounded-full text-xs">${genre}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Setup library filters
function setupLibraryFilters() {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const sortSelect = document.getElementById('sort-select');
    const clearButton = document.getElementById('clear-filters');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const genre = button.dataset.genre;
            filterMovies(genre);
        });
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortMovies(sortSelect.value);
        });
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            // Reset filters
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-genre="all"]').classList.add('active');
            if (sortSelect) sortSelect.value = 'title';
            
            filteredMovies = [...movieDatabase];
            sortMovies('title');
            renderMovies();
        });
    }
}

// Filter movies by genre
function filterMovies(genre) {
    if (genre === 'all') {
        filteredMovies = [...movieDatabase];
    } else {
        filteredMovies = movieDatabase.filter(movie => 
            movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );
    }
    
    // Apply current sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortMovies(sortSelect.value);
    } else {
        renderMovies();
    }
}

// Sort movies
function sortMovies(sortBy) {
    switch (sortBy) {
        case 'title':
            filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'year':
            filteredMovies.sort((a, b) => b.year - a.year);
            break;
        case 'rating':
            filteredMovies.sort((a, b) => b.rating - a.rating);
            break;
        case 'date-added':
            // Mock sort by recent additions
            filteredMovies.sort((a, b) => b.id - a.id);
            break;
    }
    
    renderMovies();
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInputs = document.querySelectorAll('#search-input, #advanced-search');
    
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                searchMovies(query);
            });
        }
    });
}

// Search movies
function searchMovies(query) {
    if (!query.trim()) {
        filteredMovies = [...movieDatabase];
    } else {
        filteredMovies = movieDatabase.filter(movie =>
            movie.title.toLowerCase().includes(query) ||
            movie.cast.some(actor => actor.toLowerCase().includes(query)) ||
            movie.director.toLowerCase().includes(query) ||
            movie.genre.some(genre => genre.toLowerCase().includes(query))
        );
    }
    
    // Apply current filters and sort
    const activeFilter = document.querySelector('.filter-pill.active');
    if (activeFilter && activeFilter.dataset.genre !== 'all') {
        filteredMovies = filteredMovies.filter(movie => 
            movie.genre.some(g => g.toLowerCase() === activeFilter.dataset.genre.toLowerCase())
        );
    }
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortMovies(sortSelect.value);
    } else {
        renderMovies();
    }
}

// Setup view toggle
function setupViewToggle() {
    const toggleButtons = document.querySelectorAll('.view-toggle');
    const contentGrid = document.querySelector('.grid-view');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const view = button.dataset.view;
            if (view === 'list') {
                contentGrid.classList.remove('grid-view');
                contentGrid.classList.add('list-view');
            } else {
                contentGrid.classList.remove('list-view');
                contentGrid.classList.add('grid-view');
            }
            
            renderMovies();
        });
    });
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredMovies.length} of ${movieDatabase.length} items`;
    }
}

// Watch page initialization
function initializeWatchPage() {
    setupVideoPlayer();
    loadRelatedMovies();
}

// Setup video player
function setupVideoPlayer() {
    const videoPlayer = document.getElementById('video-player');
    const playButton = document.getElementById('play-button');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeFill = document.getElementById('volume-fill');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const skipIntroBtn = document.getElementById('skip-intro');
    
    if (!videoPlayer) return;
    
    // Mock video duration
    duration = 148 * 60; // 148 minutes in seconds
    updateTimeDisplay();
    
    // Play button click
    if (playButton) {
        playButton.addEventListener('click', togglePlayPause);
    }
    
    // Play/pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // Progress bar interaction
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            currentTime = percent * duration;
            updateProgress();
            updateTimeDisplay();
        });
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('click', (e) => {
            const rect = volumeSlider.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            volumeFill.style.width = `${percent * 100}%`;
        });
    }
    
    // Settings toggle
    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener('click', () => {
            settingsMenu.classList.toggle('active');
        });
    }
    
    // Fullscreen toggle
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Skip intro button
    if (skipIntroBtn) {
        skipIntroBtn.addEventListener('click', () => {
            currentTime += 90; // Skip 90 seconds
            if (currentTime > duration) currentTime = duration;
            updateProgress();
            updateTimeDisplay();
            skipIntroBtn.classList.remove('visible');
        });
    }
    
    // Mock video progress
    setInterval(() => {
        if (isPlaying) {
            currentTime += 1;
            if (currentTime >= duration) {
                currentTime = duration;
                isPlaying = false;
            }
            updateProgress();
            updateTimeDisplay();
            
            // Show skip intro button during first 2 minutes
            if (skipIntroBtn) {
                if (currentTime > 30 && currentTime < 120) {
                    skipIntroBtn.classList.add('visible');
                } else {
                    skipIntroBtn.classList.remove('visible');
                }
            }
        }
    }, 1000);
}

// Toggle play/pause
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    const playButton = document.getElementById('play-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    
    if (playButton) {
        playButton.classList.add('hidden');
    }
    
    if (isPlaying) {
        playIcon?.classList.add('hidden');
        pauseIcon?.classList.remove('hidden');
    } else {
        playIcon?.classList.remove('hidden');
        pauseIcon?.classList.add('hidden');
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const percent = (currentTime / duration) * 100;
        progressFill.style.width = `${percent}%`;
    }
}

// Update time display
function updateTimeDisplay() {
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    
    if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(currentTime);
    }
    if (totalTimeEl) {
        totalTimeEl.textContent = formatTime(duration);
    }
}

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Toggle fullscreen
function toggleFullscreen() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Load related movies
function loadRelatedMovies() {
    const container = document.getElementById('related-movies');
    if (!container) return;
    
    const relatedMovies = movieDatabase
        .filter(movie => movie.id !== 1) // Exclude current movie
        .slice(0, 6);
    
    container.innerHTML = relatedMovies.map(movie => `
        <div class="related-card rounded-lg p-4 cursor-pointer" data-movie-id="${movie.id}">
            <div class="flex gap-4">
                <img src="${movie.poster}" alt="${movie.title}" class="w-16 h-24 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-sm mb-1">${movie.title}</h4>
                    <p class="text-xs text-gray-400 mb-2">${movie.year} • ${movie.duration}</p>
                    <div class="flex items-center">
                        <span class="rating-stars text-xs">★★★★☆</span>
                        <span class="ml-1 text-xs text-gray-400">${movie.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Movie card clicks
    document.addEventListener('click', (e) => {
        const movieCard = e.target.closest('[data-movie-id]');
        if (movieCard) {
            const movieId = parseInt(movieCard.dataset.movieId);
            handleMovieClick(movieId, e);
        }
    });
    
    // Watchlist button clicks
    document.addEventListener('click', (e) => {
        const watchlistBtn = e.target.closest('.watchlist-btn');
        if (watchlistBtn) {
            e.stopPropagation();
            const movieId = parseInt(watchlistBtn.dataset.movieId);
            toggleWatchlist(movieId, watchlistBtn);
        }
    });
    
    // Modal close
    const closeModal = document.getElementById('close-modal');
    const movieModal = document.getElementById('movie-modal');
    
    if (closeModal && movieModal) {
        closeModal.addEventListener('click', () => {
            movieModal.classList.add('hidden');
        });
        
        movieModal.addEventListener('click', (e) => {
            if (e.target === movieModal) {
                movieModal.classList.add('hidden');
            }
        });
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Mock loading more content
            anime({
                targets: loadMoreBtn,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
        });
    }
}

// Handle movie click
function handleMovieClick(movieId, event) {
    const movie = movieDatabase.find(m => m.id === movieId);
    if (!movie) return;
    
    // Check if clicking on watch now button
    const watchBtn = event.target.closest('button');
    if (watchBtn && watchBtn.textContent.includes('Watch')) {
        window.location.href = `watch.html?id=${movieId}`;
        return;
    }
    
    // Check if clicking on view details button
    if (watchBtn && watchBtn.textContent.includes('Details')) {
        showMovieModal(movie);
        return;
    }
    
    // Default action - show modal
    showMovieModal(movie);
}

// Show movie modal
function showMovieModal(movie) {
    const modal = document.getElementById('movie-modal');
    if (!modal) return;
    
    // Populate modal content
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-poster').src = movie.poster;
    document.getElementById('modal-rating-number').textContent = movie.rating;
    document.getElementById('modal-year').textContent = movie.year;
    document.getElementById('modal-duration').textContent = movie.duration;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-director').textContent = movie.director;
    document.getElementById('modal-cast').textContent = movie.cast.join(', ');
    
    // Set rating stars
    const stars = '★'.repeat(Math.floor(movie.rating / 2)) + '☆'.repeat(5 - Math.floor(movie.rating / 2));
    document.getElementById('modal-rating').textContent = stars;
    
    // Populate genres
    const genresContainer = document.getElementById('modal-genres');
    genresContainer.innerHTML = movie.genre.map(genre => 
        `<span class="genre-tag px-3 py-1 rounded-full text-sm">${genre}</span>`
    ).join('');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Toggle watchlist
function toggleWatchlist(movieId, button) {
    const index = watchlist.indexOf(movieId);
    const svg = button.querySelector('svg');
    
    if (index > -1) {
        watchlist.splice(index, 1);
        button.classList.remove('text-electric-blue');
        button.classList.add('text-white');
        svg.setAttribute('fill', 'none');
    } else {
        watchlist.push(movieId);
        button.classList.add('text-electric-blue');
        button.classList.remove('text-white');
        svg.setAttribute('fill', 'currentColor');
    }
    
    localStorage.setItem('streamvault-watchlist', JSON.stringify(watchlist));
    
    // Animate button
    anime({
        targets: button,
        scale: [1, 1.2, 1],
        duration: 300,
        easing: 'easeInOutQuad'
    });
}

// Initialize animations
function initializeAnimations() {
    // Text splitting animation
    if (typeof Splitting !== 'undefined') {
        Splitting();
        
        // Animate split text on scroll
        const splitTexts = document.querySelectorAll('[data-splitting]');
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chars = entry.target.querySelectorAll('.char');
                    anime({
                        targets: chars,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(50),
                        duration: 600,
                        easing: 'easeOutQuad'
                    });
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        splitTexts.forEach(text => textObserver.observe(text));
    }
    
    // Scroll animations for elements
    const animateElements = document.querySelectorAll('.feature-card, .info-card');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => elementObserver.observe(el));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.StreamVault = {
    movieDatabase,
    filteredMovies,
    watchlist,
    toggleWatchlist,
    showMovieModal,
    searchMovies: debounce(searchMovies, 300)
};