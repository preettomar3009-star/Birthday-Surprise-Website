// Floating Hearts Animation

const hearts = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}

setInterval(createHeart, 400);


// Open Birthday Surprise

function openSurprise() {

    window.location.href = "pages/birthday.html";

}