// Birthday Website JavaScript
// Creates floating hearts and sparkles for a magical effect

document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createSparkles();
    addScrollAnimations();
});

// ===== Floating Hearts =====
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartSymbols = ['♥', '♡', '❤', '💕', '💗', '💖', '💝'];
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#db7093', '#ff6b81'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }

    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }

    // Continuously create new hearts
    setInterval(createHeart, 1500);
}

// ===== Sparkles =====
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    const sparkleSymbols = ['✦', '✧', '★', '☆', '✨', '⋆'];

    function createSparkle() {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.color = Math.random() > 0.5 ? '#ffd700' : '#ffb6c1';
        sparkle.style.fontSize = (Math.random() * 0.8 + 0.5) + 'rem';
        sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        sparkle.style.animationDelay = Math.random() * 1 + 's';

        sparklesContainer.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }

    // Create initial sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(createSparkle, i * 100);
    }

    // Continuously create new sparkles
    setInterval(createSparkle, 500);
}

// ===== Scroll Animations =====
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.message-card, .love-declaration, .date-section').forEach(el => {
        observer.observe(el);
    });
}

// ===== Touch Interactions =====
document.querySelectorAll('.message-card, .love-declaration').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });

    card.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// ===== Create Heart Burst on Tap =====
document.body.addEventListener('click', (e) => {
    createHeartBurst(e.clientX, e.clientY);
});

function createHeartBurst(x, y) {
    const hearts = ['♥', '♡', '❤', '💕'];
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff6b81'];

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 0.8s ease-out';

        document.body.appendChild(heart);

        // Animate outward
        const angle = (i / 6) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;

        requestAnimationFrame(() => {
            heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
            heart.style.opacity = '0';
        });

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 800);
    }
}

// ===== Special Effect at Midnight =====
function checkBirthday() {
    const now = new Date();
    const birthday = new Date(2026, 1, 6); // February 6, 2026

    if (now.getMonth() === 1 && now.getDate() === 6) {
        document.body.classList.add('birthday-active');
        triggerConfetti();
    }
}

function triggerConfetti() {
    const confettiColors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffd700', '#ff6b81'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10000;
                animation: confetti-fall ${3 + Math.random() * 2}s linear forwards;
            `;

            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }

    // Add confetti animation style
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Check for birthday
checkBirthday();

// ===== Console Love Message =====
console.log('%c💕 Happy Birthday My Love! 💕', 'color: #ff69b4; font-size: 24px; font-weight: bold;');
console.log('%cMade with all my heart for my baobei laopo', 'color: #ff1493; font-size: 14px;');
