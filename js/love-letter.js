
const envelopeList = document.getElementById("envelopeList");
const loveLetter = document.getElementById("loveLetter");
const sorryLetter = document.getElementById("sorryLetter");
const nextSection = document.getElementById("nextSection");

let loveLetterOpened = false;
let sorryLetterOpened = false;

// Open a letter
document.querySelectorAll(".open-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const letterId = button.dataset.letter;

        envelopeList.hidden = true;
        nextSection.hidden = true;
        loveLetter.hidden = true;
        sorryLetter.hidden = true;

        document.getElementById(letterId).hidden = false;

        if (letterId === "loveLetter") {
            loveLetterOpened = true;
        }

        if (letterId === "sorryLetter") {
            sorryLetterOpened = true;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// Return to envelopes
document.querySelectorAll(".back-button").forEach(function(button) {
    button.addEventListener("click", function() {
        loveLetter.hidden = true;
        sorryLetter.hidden = true;
        envelopeList.hidden = false;

        if (loveLetterOpened && sorryLetterOpened) {
            nextSection.hidden = false;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
