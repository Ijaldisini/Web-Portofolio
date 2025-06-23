const texts = ["Programmer", "Web Development"];
let count = 0;
let index = 0;
let isDeleting = false;
let currentText = '';
let typingSpeed = 100;

function type() {
    currentText = texts[count];
    const displayedText = isDeleting
        ? currentText.slice(0, --index)
        : currentText.slice(0, ++index);

    const target = document.querySelector(".typewriter-text");
    if (target) {
        target.textContent = displayedText;
    }

    if (!isDeleting && index === currentText.length) {
        isDeleting = true;
        typingSpeed = 5000;
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        count = (count + 1) % texts.length;
        typingSpeed = 100;
    } else {
        typingSpeed = isDeleting ? 50 : 100;
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});



function hamburg() {
    document.querySelector('.dropdown').classList.add("active");
}

function cancel() {
    document.querySelector('.dropdown').classList.remove("active");
}