
const photoButtons = document.querySelectorAll(".photo-button");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const counter = document.getElementById("lightboxCounter");

const closeButton = document.getElementById("closeLightbox");
const previousButton = document.getElementById("previousPhoto");
const nextButton = document.getElementById("nextPhoto");

const photos = Array.from(photoButtons).map(button => {
    return button.querySelector("img").src;
});

let currentPhoto = 0;

function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;

    lightboxImage.src = photos[currentPhoto];
    counter.textContent = `${currentPhoto + 1} / ${photos.length}`;

    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closePhoto() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";
}

photoButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        showPhoto(index);
    });
});

closeButton.addEventListener("click", closePhoto);

previousButton.addEventListener("click", () => {
    showPhoto(currentPhoto - 1);
});

nextButton.addEventListener("click", () => {
    showPhoto(currentPhoto + 1);
});

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closePhoto();
    }
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        closePhoto();
    }

    if (event.key === "ArrowRight") {
        showPhoto(currentPhoto + 1);
    }

    if (event.key === "ArrowLeft") {
        showPhoto(currentPhoto - 1);
    }
});
