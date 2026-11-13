// Timeline Scroll Animation

const storyItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

storyItems.forEach((item) => {
    observer.observe(item);
});


// Floating Hearts Animation

function createStoryHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animation = "floatStoryHeart 7s linear forwards";
    heart.style.pointerEvents = "none";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}


// Add floating heart animation CSS

const style = document.createElement("style");

style.innerHTML = `
@keyframes floatStoryHeart {
    to {
        transform: translateY(-110vh) rotate(360deg);
        opacity: 0;
    }
}`;

document.head.appendChild(style);

setInterval(createStoryHeart, 800);