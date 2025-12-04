// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"#&_()!?;:<>[]{}';
const lettersArray = letters.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize) * fontSize;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 22, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Gradient effect
        const gradient = ctx.createLinearGradient(x, y, x, y + fontSize);
        gradient.addColorStop(0, '#00ff9d');
        gradient.addColorStop(0.5, '#00f3ff');
        gradient.addColorStop(1, '#0066ff');
        
        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix animation
    setInterval(drawMatrix, 35);
    
    // Add click effects to cards
    const cards = document.querySelectorAll('.edu-card, .project-card, .cert-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add typing effect to title
    const title = document.querySelector('.glitch');
    const originalText = title.dataset.text;
    let isScrambling = false;
    
    title.addEventListener('mouseenter', function() {
        if (isScrambling) return;
        isScrambling = true;
        
        let iterations = 0;
        const interval = setInterval(() => {
            this.innerText = this.innerText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return lettersArray[Math.floor(Math.random() * lettersArray.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
                isScrambling = false;
            }
            iterations += 1 / 3;
        }, 30);
    });
    
    // Add sound effects on hover (optional)
    const links = document.querySelectorAll('a, .hobby-tag, .tech-tag');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // You could add sound effects here
            this.style.cursor = 'pointer';
        });
    });
    
    // Update system time in footer
    function updateSystemTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const systemStatus = document.querySelector('.footer-links');
        if (systemStatus) {
            systemStatus.innerHTML = `
                <span>© 2025 CYBERPUNK PORTFOLIO v2.0</span>
                <span>SYSTEM TIME: ${dateString} ${timeString}</span>
                <span>STATUS: <span class="online">ONLINE</span></span>
            `;
        }
    }
    
    // Update time every second
    setInterval(updateSystemTime, 1000);
    updateSystemTime();
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        canvas.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// Terminal-like console greeting
console.log(`
%c
╔══════════════════════════════════════╗
║   CYBERPUNK PORTFOLIO v2.0           ║
║   User: KULKARNI BHUSHAN GAJANAN     ║
║   System: C-DAC PG-DITISS            ║
║   Status: ONLINE                     ║
╚══════════════════════════════════════╝
`, 'color: #00f3ff; font-family: monospace; font-size: 12px;');