// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to skills on scroll
    const skillsSection = document.querySelector('.skills-section');
    const skillItems = document.querySelectorAll('.skills-list li');
    
    if (skillsSection && skillItems.length) {
        const animateSkills = function() {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;
            
            if (sectionTop < triggerPoint) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 50);
                });
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        window.addEventListener('scroll', animateSkills);
        // Check on initial load
        animateSkills();
    }
    
    // Mobile navigation toggle (if you add a mobile menu button later)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.main-navigation');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Form validation for contact form (if you add one later)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (emailInput && !isValidEmail(emailInput.value)) {
                e.preventDefault();
                showError(emailInput, 'Please enter a valid email address');
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                e.preventDefault();
                showError(messageInput, 'Please enter a message');
            }
        });
    }
    
    // Helper function for email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form errors
    function showError(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const parent = inputElement.parentElement;
        parent.appendChild(errorElement);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            parent.removeChild(errorElement);
        }, 3000);
    }
    
    // Add dark mode toggle functionality
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved user preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedMode = localStorage.getItem('darkMode');
        
        // Apply dark mode if saved or preferred
        if (savedMode === 'dark' || (savedMode === null && prefersDarkMode)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.setAttribute('aria-pressed', 'true');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            this.setAttribute('aria-pressed', isDarkMode ? 'true' : 'false');
            localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
        });
    }
});

// Skills section - View More functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('view-more-skills');
    const hiddenSkills = document.querySelectorAll('.hidden-skill');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            hiddenSkills.forEach(skill => {
                if (skill.style.display === 'list-item' || skill.classList.contains('active-skill')) {
                    skill.style.display = 'none';
                    skill.classList.remove('active-skill');
                    viewMoreBtn.textContent = 'View More Skills';
                } else {
                    skill.style.display = 'list-item';
                    skill.classList.add('active-skill');
                    viewMoreBtn.textContent = 'View Less Skills';
                }
            });
        });
    }
});