// Set Birthday Date Here
// Format: YYYY-MM-DDTHH:MM:SS

const birthdayDate = new Date("2026-11-14T00:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = birthdayDate - now;

    if (distance <= 0) {

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        document.getElementById("birthdayMessage").innerHTML =
            "🎂 Happy Birthday My Love! ❤️";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (distance / 1000) % 60
    );

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

setInterval(updateCountdown, 1000);

updateCountdown();


// Animated Stars

const stars = document.getElementById("stars");

for (let i = 0; i < 70; i++) {

    const star = document.createElement("div");

    star.className = "star";
    star.innerHTML = "✦";

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    star.style.animationDelay = Math.random() * 3 + "s";

    stars.appendChild(star);
}


// Animated Flowers

const flowers = document.getElementById("flowers");

function createFlower() {

    const flower = document.createElement("div");

    flower.className = "flower";

    flower.innerHTML = ["🌸", "🌷", "🌹", "💮"][
        Math.floor(Math.random() * 4)
    ];

    flower.style.left = Math.random() * 100 + "vw";

    flower.style.animationDuration =
        (6 + Math.random() * 5) + "s";

    flowers.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 11000);
}

setInterval(createFlower, 700);


// Next Page

function goToNextPage() {
    window.location.href = "cake.html";
}