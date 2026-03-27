const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#fece64', '#ff8483'];

export const fireConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: Math.random() * 6 - 3,
            vy: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    let animationId;
    let startTime = Date.now();
    const duration = 3000; // 3 seconds

    const animate = () => {
        const currentTime = Date.now();
        if (currentTime - startTime > duration) {
            cancelAnimationFrame(animationId);
            document.body.removeChild(canvas);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            // Reset particle if it falls off screen
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });

        animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener after animation
    setTimeout(() => {
        window.removeEventListener('resize', handleResize);
    }, duration);
};
