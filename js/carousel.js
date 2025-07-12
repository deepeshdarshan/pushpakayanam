class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('#carouselTrack');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.indicators = container.querySelectorAll('.indicator');
        this.prevBtn = container.querySelector('#prevBtn');
        this.nextBtn = container.querySelector('#nextBtn');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        
        // Add these instance properties for swipe functionality
        this.startX = 0;
        this.endX = 0;
        this.isDragging = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCarousel();
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        this.track.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Mouse drag support - only on the track
        this.track.addEventListener('mousedown', (e) => {
            // Prevent dragging on buttons and indicators
            if (e.target.closest('.carousel-nav') || e.target.closest('.indicator')) {
                return;
            }
            
            this.isDragging = true;
            this.startX = e.clientX;
            this.track.addEventListener('mousemove', this.handleMouseMove);
            e.preventDefault(); // Prevent text selection
        });

        document.addEventListener('mouseup', (e) => {
            if (this.isDragging) {
                this.endX = e.clientX;
                this.track.removeEventListener('mousemove', this.handleMouseMove);
                this.handleSwipe();
                this.isDragging = false;
            }
        });
    }

    handleMouseMove = (e) => {
        // Optional: Add visual feedback during drag
    }

    handleSwipe() {
        const threshold = 50;
        const diff = this.startX - this.endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
        
        // Reset coordinates
        this.startX = 0;
        this.endX = 0;
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentSlide = this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update track position
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    // Auto-play functionality (optional)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Slide functions start
function initializeCarousel() {
    const carouselContainer = document.getElementById('carousel-container');
    if (!carouselContainer) {
        console.error('Carousel container not found!');
        return;
    }
    carouselContainer.innerHTML = '';
    const slides = generateAllSlides();
    addSlidesToCarousel(carouselContainer, slides);
}



// Slide functions end

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = new Carousel(carouselContainer);
    
    // Optional: Start auto-play
    // carousel.startAutoPlay();
    
    // Pause auto-play on hover
    carouselContainer.addEventListener('mouseenter', () => {
        carousel.stopAutoPlay();
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        // carousel.startAutoPlay();
    });
});