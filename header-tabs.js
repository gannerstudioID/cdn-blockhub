// Fungsi Navbar
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const overlay = document.getElementById("overlay");

let startX = 0;
let currentX = 0;
let isDragging = false;

// Fungsi untuk membuka navbar
const openNavbar = () => {
  navbar.style.transform = "translateX(0)";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
};

// Fungsi untuk menutup navbar
const closeNavbar = () => {
  navbar.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
};

// Event Listener untuk membuka navbar
menuToggle.addEventListener("click", openNavbar);

// Event Listener untuk menutup navbar dengan overlay
overlay.addEventListener("click", closeNavbar);

// Event untuk menangani swipe gesture
navbar.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

navbar.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const translateX = Math.min(0, currentX - startX);

  if (translateX < 0) {
    navbar.style.transform = `translateX(${translateX}px)`;
  }
});

navbar.addEventListener("touchend", () => {
  if (!isDragging) return;

  const threshold = navbar.offsetWidth / 3; // 1/3 dari lebar navbar
  if (Math.abs(currentX - startX) > threshold) {
    closeNavbar();
  } else {
    openNavbar();
  }

  isDragging = false;
});

// Fungsi Tabs-Header
let lastScrollTop = 0; // Posisi scroll terakhir
const header = document.getElementById("header");
const tabs = document.getElementById("tabs");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scroll ke bawah - sembunyikan
    header.classList.add("hidden");
    tabs.classList.add("hidden");
  } else {
    // Scroll ke atas - tampilkan
    header.classList.remove("hidden");
    tabs.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Mencegah nilai negatif
});
