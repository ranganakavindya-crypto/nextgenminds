// ===== NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

// Trigger counter when visible
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// ===== WHATSAPP INTEGRATION =====
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const WHATSAPP_NUMBER = '94776265638'; // Your WhatsApp number without +

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.querySelector('[name="name"]').value.trim();
    const mobile = document.querySelector('[name="mobile"]').value.trim();
    const email = document.querySelector('[name="email"]').value.trim();
    const grade = document.querySelector('[name="grade"]').value;
    const subject = document.querySelector('[name="subject"]').value;
    const message = document.querySelector('[name="message"]').value.trim();

    // Format WhatsApp message
    const whatsappMessage = `
🎓 *New Inquiry - NEXTGEN Minds*

👤 *Name:* ${name}
📱 *Mobile:* ${mobile}
📧 *Email:* ${email || 'Not provided'}
📚 *Grade:* ${grade || 'Not selected'}
📖 *Subject:* ${subject || 'Not selected'}

💬 *Message:*
${message || 'No additional message'}

─────────────
Sent from nextgenminds4u.com
    `.trim();

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show success modal first
    successModal.classList.add('active');

    // Open WhatsApp after 1.5 seconds (so user sees modal)
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        contactForm.reset();
    }, 1500);
});

function closeModal() {
    successModal.classList.remove('active');
}

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== COOL EFFECTS =====

// 1. Scroll reveal animation for sections
const revealElements = document.querySelectorAll('.about-feature, .teacher-card, .subject-card, .testimonial-card, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// 2. Floating animation for hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    heroImage.style.animation = 'float 6s ease-in-out infinite';
}

// 3. Button hover effects
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 4. Subject card hover glow
const subjectCards = document.querySelectorAll('.subject-card');
subjectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(65, 105, 225, 0.3)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// 5. Optional: WhatsApp floating button (uncomment to enable)
/*
const whatsappFloat = document.createElement('a');
whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
whatsappFloat.target = '_blank';
whatsappFloat.className = 'whatsapp-float';
whatsappFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsappFloat.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    z-index: 999;
    transition: transform 0.3s ease;
    animation: pulse-whatsapp 2s infinite;
`;
document.body.appendChild(whatsappFloat);

whatsappFloat.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});
whatsappFloat.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});
*/
