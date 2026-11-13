
/* ==========================================
   KIRTI BIRTHDAY WEBSITE
   3D CAKE + FIREWORKS + BIRTHDAY POPUP
   Made with love by Preet ❤️
========================================== */

let fireworks = [];
let heartParticles = [];
let fireworksRunning = false;
let fireworkFrame = null;


/* ==========================================
   STEP 1: MAKE A WISH
   BLOW OUT ALL CANDLES
========================================== */

function makeWish() {

    const scene = document.getElementById("cakeScene");
    const message = document.getElementById("wishMessage");
    const button = document.getElementById("wishButton");

    if (!scene || scene.classList.contains("blown")) {
        return;
    }

    // Turn off candle flames
    scene.classList.add("blown");

    if (message) {
        message.textContent =
            "Your wishes deserve a sky full of magic! ❤️";
    }

    if (button) {
        button.disabled = true;
        button.textContent = "Your magical moment is here! 💗";
    }

    // Floating hearts
    for (let i = 0; i < 35; i++) {
        setTimeout(createHeart, i * 90);
    }

    // Start fireworks after candles turn off
    setTimeout(() => {
        startFireworks();
    }, 750);

    // Show birthday popup after fireworks
    setTimeout(() => {

        const modal = document.getElementById("birthdayModal");

        if (modal) {
            modal.hidden = false;
            document.body.style.overflow = "hidden";
        }

    }, 9250);
}


/* ==========================================
   STEP 2: FLOATING HEARTS
========================================== */

function createHeart() {

    const layer = document.getElementById("hearts");

    if (!layer) return;

    const heart = document.createElement("span");

    heart.className = "heart";

    const heartItems = [
        "❤️",
        "💗",
        "💕",
        "✨",
        "🌸"
    ];

    heart.textContent =
        heartItems[Math.floor(Math.random() * heartItems.length)];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    layer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}


/* ==========================================
   STEP 3: START FIREWORKS
========================================== */

function startFireworks() {

    const canvas = document.getElementById("fireworksCanvas");

    if (!canvas || fireworksRunning) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Canvas screen size
    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    fireworks = [];
    heartParticles = [];

    fireworksRunning = true;


    /* FIREWORK COLOURS */

    const colours = [
        "#ff4f87",
        "#ffcf70",
        "#ffffff",
        "#ff80c0",
        "#d9a5ff",
        "#ff765e",
        "#a7f3d0",
        "#ffd166",
        "#ffb6d9"
    ];

    function randomColour() {

        return colours[
            Math.floor(Math.random() * colours.length)
        ];
    }


    /* ======================================
       STEP 4: CREATE FIREWORK EXPLOSION
    ====================================== */

    function explode(x, y, count = 75) {

        const colour = randomColour();

        for (let i = 0; i < count; i++) {

            const angle =
                (Math.PI * 2 * i) / count;

            const speed =
                1.5 + Math.random() * 4.5;

            fireworks.push({

                x: x,
                y: y,

                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,

                life: 65 + Math.random() * 35,
                maxLife: 100,

                colour:
                    Math.random() > 0.35
                        ? colour
                        : randomColour(),

                size: 1.5 + Math.random() * 2.5
            });
        }
    }


    /* ======================================
       STEP 5: HEART SHAPED FIREWORK
       NO NAME IN FIREWORKS
    ====================================== */

    function createHeartFirework() {

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight * 0.42;

        heartParticles = [];

        for (let i = 0; i < 180; i++) {

            const t =
                (Math.PI * 2 * i) / 180;

            const hx =
                16 * Math.pow(Math.sin(t), 3);

            const hy =
                -(
                    13 * Math.cos(t)
                    - 5 * Math.cos(2 * t)
                    - 2 * Math.cos(3 * t)
                    - Math.cos(4 * t)
                );

            heartParticles.push({

                x: cx + hx * 7,
                y: cy + hy * 7,

                colour:
                    i % 2 === 0
                        ? "#ff5c9a"
                        : "#ffd166",

                size: 1.8 + Math.random() * 2,

                phase: Math.random() * Math.PI * 2
            });
        }
    }


    /* ======================================
       STEP 6: ANIMATION
    ====================================== */

    let burstTimer = 0;
    let heartShown = false;

    const startTime = performance.now();

    function animate(now) {

        if (!fireworksRunning) return;

        const elapsed = now - startTime;

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        /* RANDOM FIREWORK BURSTS */

        burstTimer++;

        if (
            burstTimer % 17 === 0 &&
            elapsed < 7500
        ) {

            const x =
                70 + Math.random() *
                (window.innerWidth - 140);

            const y =
                70 + Math.random() *
                (window.innerHeight * 0.55);

            explode(
                x,
                y,
                65 + Math.floor(Math.random() * 35)
            );
        }


        /* SHOW HEART AFTER OPENING FIREWORKS */

        if (elapsed > 1700 && !heartShown) {

            createHeartFirework();

            // Extra fireworks around the heart
            explode(
                window.innerWidth * 0.18,
                window.innerHeight * 0.35,
                100
            );

            explode(
                window.innerWidth * 0.82,
                window.innerHeight * 0.35,
                100
            );

            explode(
                window.innerWidth * 0.5,
                window.innerHeight * 0.15,
                120
            );

            heartShown = true;
        }


        /* DRAW NORMAL FIREWORK PARTICLES */

        for (let i = fireworks.length - 1; i >= 0; i--) {

            const p = fireworks[i];

            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.035;
            p.vx *= 0.99;

            p.life--;

            const alpha = Math.max(
                0,
                p.life / p.maxLife
            );

            ctx.globalAlpha = alpha;

            ctx.fillStyle = p.colour;

            ctx.shadowBlur = 12;
            ctx.shadowColor = p.colour;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

            if (p.life <= 0) {
                fireworks.splice(i, 1);
            }
        }


        /* DRAW HEART SHAPED SPARKLES */

        if (heartShown) {

            heartParticles.forEach(p => {

                const pulse =
                    0.65 +
                    Math.sin(now / 180 + p.phase) * 0.35;

                ctx.globalAlpha = pulse;

                ctx.fillStyle = p.colour;

                ctx.shadowBlur = 18;
                ctx.shadowColor = p.colour;

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.size * pulse,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            });
        }


        /* RESET CANVAS EFFECTS */

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;


        /* STOP FIREWORKS AFTER 8.5 SECONDS */

        if (elapsed < 8500) {

            fireworkFrame =
                requestAnimationFrame(animate);

        } else {

            fireworksRunning = false;

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );
        }
    }


    /* ======================================
       STEP 7: FIRST FIREWORK EXPLOSIONS
    ====================================== */

    explode(
        window.innerWidth * 0.25,
        window.innerHeight * 0.35,
        100
    );

    explode(
        window.innerWidth * 0.75,
        window.innerHeight * 0.35,
        100
    );

    explode(
        window.innerWidth * 0.5,
        window.innerHeight * 0.22,
        120
    );


    // Start animation
    fireworkFrame =
        requestAnimationFrame(animate);
}


/* ==========================================
   STEP 8: GO TO LOVE STORY PAGE
========================================== */

function nextPage() {

    window.location.href = "love-story.html";
}
