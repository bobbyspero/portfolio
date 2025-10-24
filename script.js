// Portfolio projects data
const projects = [
    { id: 1, title: 'NEURAL_NETWORK.AI', ascii: '#', description: 'Machine Learning Project' },
    { id: 2, title: 'CRYPTO_VAULT.SYS', ascii: '@', description: 'Blockchain Application' },
    { id: 3, title: 'QUANTUM_CODE.EXE', ascii: '%', description: 'Algorithm Visualization' },
    { id: 4, title: 'DATA_MATRIX.DB', ascii: '$', description: 'Big Data Analytics' },
    { id: 5, title: 'CYBER_GUARD.SEC', ascii: '&', description: 'Security Framework' },
    { id: 6, title: 'PIXEL_FORGE.GFX', ascii: '*', description: 'Graphics Engine' },
    { id: 7, title: 'SOUND_WAVE.DSP', ascii: '+', description: 'Audio Synthesis' },
    { id: 8, title: 'CLOUD_NEXUS.NET', ascii: '=', description: 'Cloud Infrastructure' },
    { id: 9, title: 'API_GATEWAY.REST', ascii: '~', description: 'Backend Services' },
    { id: 10, title: 'BRAND_SENTIMENT.TRACK', ascii: '📊', description: 'Brand Sentiment Tracker', url: 'https://bobbyspero.github.io/sentiment/' },
];

// DOM Elements
const gridWrapper = document.getElementById('gridWrapper');
const titleTracker = document.getElementById('titleTracker');

// Mouse position tracking
let mouseX = 0;
let mouseY = 0;

// Initialize the portfolio grid
function initGrid() {
    projects.forEach(project => {
        const gridItem = createGridItem(project);
        gridWrapper.appendChild(gridItem);
    });
}

// Create individual grid item
function createGridItem(project) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.dataset.title = project.title;
    item.dataset.ascii = project.ascii;
    item.dataset.id = project.id;
    if (project.url) {
        item.dataset.url = project.url;
    }

    item.innerHTML = `
        <div class="grid-content">
            <div class="grid-number">[${String(project.id).padStart(2, '0')}]</div>
            <div class="grid-label">${project.description}</div>
        </div>
    `;

    // Add event listeners
    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);
    item.addEventListener('mousemove', handleMouseMove);
    item.addEventListener('click', handleClick);

    // Add 3D tilt effect on mouse move
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        item.style.transform = `translateZ(50px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });

    return item;
}

// Handle mouse enter on grid item
function handleMouseEnter(e) {
    const title = e.currentTarget.dataset.title;
    titleTracker.textContent = title;
    titleTracker.classList.add('active');

    // Add glow effect to the item
    e.currentTarget.style.boxShadow = `
        0 0 30px rgba(0, 255, 65, 0.5),
        0 0 60px rgba(0, 255, 255, 0.3),
        inset 0 0 30px rgba(0, 255, 65, 0.2)
    `;
}

// Handle mouse leave from grid item
function handleMouseLeave(e) {
    titleTracker.classList.remove('active');
    e.currentTarget.style.boxShadow = '';
}

// Handle mouse move for title tracking
function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update title tracker position
    updateTitlePosition();
}

// Update title tracker position
function updateTitlePosition() {
    titleTracker.style.left = `${mouseX}px`;
    titleTracker.style.top = `${mouseY - 40}px`;
}

// Handle click on grid item
function handleClick(e) {
    const projectId = e.currentTarget.dataset.id;
    const title = e.currentTarget.dataset.title;
    const url = e.currentTarget.dataset.url;

    // Create glitch effect
    createGlitchEffect(e.currentTarget);

    // Log click
    console.log(`Clicked project: ${title} (ID: ${projectId})`);

    // Navigate to project page if URL exists
    if (url) {
        window.location.href = url;
    }
}

// Create glitch effect on click
function createGlitchEffect(element) {
    element.style.animation = 'glitch 0.3s ease';

    setTimeout(() => {
        element.style.animation = '';
    }, 300);
}

// Add parallax effect to the grid based on mouse position
function addParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;

        gridWrapper.style.transform = `
            translateY(0px)
            rotateX(${-moveY}deg)
            rotateY(${moveX}deg)
        `;
    });
}

// Add ASCII rain effect
function addASCIIRain() {
    const overlay = document.querySelector('.ascii-overlay');
    const chars = '# @ % $ & * + = - _ / \\ | { } [ ] < > ? ! ~ ^ ` \' " : ; . ,';
    const columns = Math.floor(window.innerWidth / 12);
    const rows = Math.floor(window.innerHeight / 14);

    let asciiContent = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            asciiContent += randomChar + ' ';
        }
        asciiContent += '\n';
    }

    overlay.textContent = asciiContent;
}

// Handle touch events for mobile
function handleTouchEvents() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        let touchTimeout;

        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const title = item.dataset.title;
            titleTracker.textContent = title;
            titleTracker.classList.add('active');

            // For mobile, show title at bottom
            if (window.innerWidth <= 768) {
                titleTracker.style.position = 'fixed';
                titleTracker.style.left = '50%';
                titleTracker.style.bottom = '2rem';
                titleTracker.style.top = 'auto';
                titleTracker.style.transform = 'translateX(-50%)';
            }

            // Auto-hide after 2 seconds
            clearTimeout(touchTimeout);
            touchTimeout = setTimeout(() => {
                titleTracker.classList.remove('active');
            }, 2000);
        });
    });
}

// Keyboard navigation
function addKeyboardNavigation() {
    const gridItems = Array.from(document.querySelectorAll('.grid-item'));
    let currentIndex = 0;

    document.addEventListener('keydown', (e) => {
        const columns = getComputedStyle(gridWrapper).gridTemplateColumns.split(' ').length;

        switch(e.key) {
            case 'ArrowRight':
                currentIndex = Math.min(currentIndex + 1, gridItems.length - 1);
                break;
            case 'ArrowLeft':
                currentIndex = Math.max(currentIndex - 1, 0);
                break;
            case 'ArrowDown':
                currentIndex = Math.min(currentIndex + columns, gridItems.length - 1);
                break;
            case 'ArrowUp':
                currentIndex = Math.max(currentIndex - columns, 0);
                break;
            case 'Enter':
                gridItems[currentIndex].click();
                return;
            default:
                return;
        }

        // Focus the selected item
        gridItems[currentIndex].focus();
        gridItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Show title
        const title = gridItems[currentIndex].dataset.title;
        titleTracker.textContent = title;
        titleTracker.classList.add('active');

        const rect = gridItems[currentIndex].getBoundingClientRect();
        titleTracker.style.left = `${rect.left + rect.width / 2}px`;
        titleTracker.style.top = `${rect.top - 40}px`;

        setTimeout(() => {
            titleTracker.classList.remove('active');
        }, 2000);
    });

    // Make grid items focusable
    gridItems.forEach(item => {
        item.tabIndex = 0;
    });
}

// Add animated grid lines
function addGridLines() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item, index) => {
        // Stagger the animation
        item.style.animationDelay = `${index * 0.1}s`;

        // Add entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateZ(-100px)';

        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateZ(0)';
        }, index * 100);
    });
}

// Initialize everything
function init() {
    initGrid();
    addParallaxEffect();
    addASCIIRain();
    handleTouchEvents();
    addKeyboardNavigation();

    // Wait for grid items to be created, then add entrance animation
    setTimeout(addGridLines, 100);
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Regenerate ASCII rain on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        addASCIIRain();
    }, 250);
});

// Console ASCII art
console.log(`
 ╔═══════════════════════════════════════╗
 ║   3D ASCII PORTFOLIO GRID v1.0        ║
 ║   --------------------------------    ║
 ║   Press Arrow Keys to Navigate        ║
 ║   Click to Select Project             ║
 ║   Hover for Title Display             ║
 ╚═══════════════════════════════════════╝
`);
