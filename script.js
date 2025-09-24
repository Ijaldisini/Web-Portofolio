const texts = ["Informatics Student", "Prompter"];
let count = 1;
let index = 0;
let isDeleting = false;
let currentText = '';
let typingSpeed = 150;

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
        typingSpeed = 150;
    } else {
        typingSpeed = isDeleting ? 50 : 100;
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    type();
});



window.addEventListener("scroll", () => {
  const timeline = document.querySelector(".timeline");
  const line = document.querySelector(".timeline .line");

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // progress scroll (0 - 1)
  let progress = 1 - rect.bottom / (timeline.offsetHeight + windowHeight);

  if (progress < 0) progress = 0;
  if (progress > 1) progress = 1;

  line.style.height = progress * 100 + "%";
});



function hamburg() {
    document.querySelector('.dropdown').classList.add("active");
}

function cancel() {
    document.querySelector('.dropdown').classList.remove("active");
}



function hamburg() {
    const dropdown = document.querySelector('.dropdown');
    const hamburgIcon = document.querySelector('.hamburg');
    const nav = document.querySelector('nav');
    
    dropdown.classList.add('show');
    hamburgIcon.style.display = 'none';
    nav.classList.add('hamburger-open');
}

function cancel() {
    const dropdown = document.querySelector('.dropdown');
    const hamburgIcon = document.querySelector('.hamburg');
    const nav = document.querySelector('nav');
    
    dropdown.classList.remove('show');
    hamburgIcon.style.display = 'block';
    nav.classList.remove('hamburger-open');
}

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    const navHeight = document.querySelector('nav').offsetHeight;
    const scrollPosition = section.offsetTop - navHeight - 20;
    
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (window.scrollY < 150) {
        currentSection = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === '#' && currentSection === 'home') {
            link.classList.add('active');
        } else if (linkHref === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', function() {
    updateActiveLink();
});

document.querySelectorAll('.nav-container .links .link a').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        
        // Jika link home, scroll ke atas
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollToSection(href);
        }
    });
});

document.querySelectorAll('.dropdown .links a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        
        cancel();
        
        setTimeout(function() {
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                scrollToSection(href);
            }
        }, 300);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    updateActiveLink();
});