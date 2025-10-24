// ====================================================================
// CONFIGURATION: UPDATE YOUR PROJECTS HERE
// ====================================================================
// To add or modify projects:
// 1. Update the projects array below
// 2. Each project needs:
//    - id: Unique number
//    - title: Project name (appears on hover)
//    - ascii: Single character for decoration
//    - description: Short description (shown on grid card)
//    - fullDescription: Detailed description (shown in expanded view)
//    - gallery: Array of image URLs for the gallery
//    - link: External link (optional)
// 3. Save this file and refresh your browser
// ====================================================================

const projects = [
    {
        id: 1,
        title: 'Project One',
        ascii: '#',
        description: 'First Project',
        fullDescription: 'This is a detailed description of Project One. You can add multiple paragraphs, technical details, your role, technologies used, and any other information about this project.',
        gallery: [
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+1+Image+1',
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+1+Image+2',
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+1+Image+3'
        ],
        link: 'https://example.com' // Optional external link
    },
    {
        id: 2,
        title: 'Project Two',
        ascii: '@',
        description: 'Second Project',
        fullDescription: 'Detailed information about Project Two goes here. Explain what makes this project special, the challenges you faced, and the solutions you implemented.',
        gallery: [
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+2+Image+1',
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+2+Image+2'
        ],
        link: ''
    },
    {
        id: 3,
        title: 'Project Three',
        ascii: '%',
        description: 'Third Project',
        fullDescription: 'An in-depth look at Project Three. Include details about the technology stack, your contribution, and the impact of this work.',
        gallery: [
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+3+Image+1'
        ],
        link: ''
    },
    {
        id: 4,
        title: 'Project Four',
        ascii: '$',
        description: 'Fourth Project',
        fullDescription: 'Project Four description with all the relevant details about the work, process, and outcomes.',
        gallery: [
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+4+Image+1',
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+4+Image+2'
        ],
        link: ''
    },
    {
        id: 5,
        title: 'Project Five',
        ascii: '&',
        description: 'Fifth Project',
        fullDescription: 'Everything you need to know about Project Five, including technical specifications and achievements.',
        gallery: [
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+5+Image+1'
        ],
        link: ''
    },
    {
        id: 6,
        title: 'Project Six',
        ascii: '*',
        description: 'Sixth Project',
        fullDescription: 'A comprehensive overview of Project Six with details on the development process and final results.',
        gallery: [
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+6+Image+1',
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+6+Image+2',
            'https://via.placeholder.com/800x600/000000/FFFFFF?text=Project+6+Image+3'
        ],
        link: ''
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

// Handle click on grid item - open expanded view
function handleClick(e) {
    const projectId = e.currentTarget.dataset.id;
    const project = projects.find(p => p.id == projectId);

    if (project) {
        openProjectModal(project);
    }
}

// ===================================
// PROJECT MODAL FUNCTIONALITY
// ===================================

let currentGalleryIndex = 0;
let currentProject = null;

// Modal elements
const projectModal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');
const galleryImage = document.getElementById('galleryImage');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryDots = document.getElementById('galleryDots');

// Open project modal
function openProjectModal(project) {
    currentProject = project;
    currentGalleryIndex = 0;

    // Set modal content
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.fullDescription;

    // Set link
    if (project.link && project.link !== '' && project.link !== '#') {
        modalLink.href = project.link;
        modalLink.style.display = 'inline-block';
    } else {
        modalLink.style.display = 'none';
    }

    // Initialize gallery
    initGallery(project.gallery);

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
}

// Initialize gallery
function initGallery(images) {
    if (!images || images.length === 0) {
        galleryImage.src = 'https://via.placeholder.com/800x600/000000/FFFFFF?text=No+Image';
        galleryPrev.style.display = 'none';
        galleryNext.style.display = 'none';
        galleryDots.innerHTML = '';
        return;
    }

    // Show first image
    updateGalleryImage();

    // Create dots
    galleryDots.innerHTML = '';
    images.forEach((img, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentGalleryIndex = index;
            updateGalleryImage();
        });
        galleryDots.appendChild(dot);
    });

    // Show/hide navigation buttons
    galleryPrev.style.display = images.length > 1 ? 'flex' : 'none';
    galleryNext.style.display = images.length > 1 ? 'flex' : 'none';

    // Update button states
    updateNavigationButtons();
}

// Update gallery image
function updateGalleryImage() {
    if (!currentProject || !currentProject.gallery) return;

    const images = currentProject.gallery;
    galleryImage.src = images[currentGalleryIndex];

    // Update dots
    const dots = galleryDots.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentGalleryIndex);
    });

    updateNavigationButtons();
}

// Update navigation button states
function updateNavigationButtons() {
    if (!currentProject || !currentProject.gallery) return;

    const images = currentProject.gallery;
    galleryPrev.disabled = currentGalleryIndex === 0;
    galleryNext.disabled = currentGalleryIndex === images.length - 1;
}

// Gallery navigation - previous
function previousImage() {
    if (!currentProject || !currentProject.gallery) return;

    if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        updateGalleryImage();
    }
}

// Gallery navigation - next
function nextImage() {
    if (!currentProject || !currentProject.gallery) return;

    if (currentGalleryIndex < currentProject.gallery.length - 1) {
        currentGalleryIndex++;
        updateGalleryImage();
    }
}

// Modal event listeners
modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);
galleryPrev.addEventListener('click', previousImage);
galleryNext.addEventListener('click', nextImage);

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (!projectModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeProjectModal();
    } else if (e.key === 'ArrowLeft') {
        previousImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Add parallax effect to the grid based on mouse position
function addParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        // Calculate rotation based on mouse position
        // More movement = more rotation (divided by smaller number for stronger effect)
        const moveX = (e.clientX - window.innerWidth / 2) / 30;
        const moveY = (e.clientY - window.innerHeight / 2) / 30;

        // Apply smooth rotation to the grid
        gridWrapper.style.transform = `
            rotateX(${-moveY}deg)
            rotateY(${moveX}deg)
        `;
    });

    // Reset rotation when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        gridWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
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
