// ====================================================================
// CONFIGURATION: UPDATE YOUR PROJECTS HERE
// ====================================================================
// To add or modify projects:
// 1. Update the projects array below
// 2. Each project needs: id, title, ascii, description, and url (optional)
// 3. The ascii character appears as a decorative background symbol
// 4. Save this file and refresh your browser
// ====================================================================

const projects = [
    {
        id: 1,
        title: 'Project One',
        ascii: '#',
        description: 'First Project',
        url: '#' // Optional: add link to project
    },
    {
        id: 2,
        title: 'Project Two',
        ascii: '@',
        description: 'Second Project',
        url: '#'
    },
    {
        id: 3,
        title: 'Project Three',
        ascii: '%',
        description: 'Third Project',
        url: '#'
    },
    {
        id: 4,
        title: 'Project Four',
        ascii: '$',
        description: 'Fourth Project',
        url: '#'
    },
    {
        id: 5,
        title: 'Project Five',
        ascii: '&',
        description: 'Fifth Project',
        url: '#'
    },
    {
        id: 6,
        title: 'Project Six',
        ascii: '*',
        description: 'Sixth Project',
        url: '#'
    },
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
}

// Handle mouse leave from grid item
function handleMouseLeave(e) {
    titleTracker.classList.remove('active');
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
    const projectUrl = e.currentTarget.dataset.url;

    // Find the project to get its URL
    const project = projects.find(p => p.id == projectId);

    if (project && project.url && project.url !== '#') {
        // Navigate to project URL
        window.location.href = project.url;
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
