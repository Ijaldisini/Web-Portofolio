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




// 1. Fungsi untuk membuka hamburger menu
function hamburg() {
    // Ambil elemen yang dibutuhkan
    const dropdown = document.querySelector('.dropdown');
    const hamburgIcon = document.querySelector('.hamburg');
    const nav = document.querySelector('nav');
    
    // Tampilkan dropdown
    dropdown.classList.add('show');
    // Sembunyikan hamburger icon
    hamburgIcon.style.display = 'none';
    // Hilangkan blur dari nav
    nav.classList.add('hamburger-open');
}

// 2. Fungsi untuk menutup hamburger menu
function cancel() {
    // Ambil elemen yang dibutuhkan
    const dropdown = document.querySelector('.dropdown');
    const hamburgIcon = document.querySelector('.hamburg');
    const nav = document.querySelector('nav');
    
    // Sembunyikan dropdown
    dropdown.classList.remove('show');
    // Tampilkan hamburger icon
    hamburgIcon.style.display = 'block';
    // Kembalikan blur pada nav
    nav.classList.remove('hamburger-open');
}

// 3. Fungsi untuk scroll ke section dengan jarak 20px dari nav
function scrollToSection(sectionId) {
    // Cari section yang dituju
    const section = document.querySelector(sectionId);
    // Dapatkan tinggi nav
    const navHeight = document.querySelector('nav').offsetHeight;
    // Hitung posisi scroll (tinggi section - tinggi nav - 20px)
    const scrollPosition = section.offsetTop - navHeight - 20;
    
    // Scroll ke posisi tersebut dengan animasi smooth
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

// 4. Fungsi untuk menandai link yang aktif berdasarkan scroll
function updateActiveLink() {
    // Ambil semua section
    const sections = document.querySelectorAll('section[id]');
    // Ambil semua link nav
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Cek section mana yang sedang terlihat
    let currentSection = '';
    
    // Loop semua section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Jika posisi scroll berada di dalam section ini
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Jika di bagian paling atas, anggap sebagai home
    if (window.scrollY < 150) {
        currentSection = 'home';
    }
    
    // Update semua link nav
    navLinks.forEach(link => {
        // Hapus class active dari semua link
        link.classList.remove('active');
        
        // Tambahkan class active ke link yang sesuai
        const linkHref = link.getAttribute('href');
        if (linkHref === '#' && currentSection === 'home') {
            link.classList.add('active');
        } else if (linkHref === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// 5. Event listener saat halaman di-scroll
window.addEventListener('scroll', function() {
    updateActiveLink();
});

// 6. Event listener untuk klik pada link nav desktop
document.querySelectorAll('.nav-container .links .link a').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Cegah scroll default
        
        const href = this.getAttribute('href');
        
        // Jika link home, scroll ke atas
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Jika link section lain, scroll ke section tersebut
            scrollToSection(href);
        }
    });
});

// 7. Event listener untuk klik pada link dropdown mobile
document.querySelectorAll('.dropdown .links a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Cegah scroll default
        
        const href = this.getAttribute('href');
        
        // Tutup dropdown dulu
        cancel();
        
        // Tunggu sebentar agar animasi dropdown selesai, lalu scroll
        setTimeout(function() {
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                scrollToSection(href);
            }
        }, 300);
    });
});

// 8. Jalankan fungsi saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateActiveLink();
});