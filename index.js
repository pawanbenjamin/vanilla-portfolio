// ===== Hero Text Animation =====
const heroLines = [
  "\u{1F44B}\u{1F3FD} hello!",
  "I'm pawan,",
  "fullstack",
  "engineer",
  "& educator."
];

const heroEl = document.querySelector(".hero-text");
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
let charDelay = 0;

heroLines.forEach((line, lineIdx) => {
  if (lineIdx > 0) {
    heroEl.appendChild(document.createElement("br"));
  }

  const graphemes = [...segmenter.segment(line)].map((s) => s.segment);

  graphemes.forEach((char) => {
    const span = document.createElement("span");
    if (char === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = char;
    }
    span.style.animationDelay = `${charDelay * 0.05}s`;
    heroEl.appendChild(span);
    charDelay++;
  });
});

// Set explore button delay
const explore = document.getElementById("explore");
explore.style.animationDelay = `${charDelay * 0.05 + 0.4}s`;

// ===== Nav Scroll Effect =====
const nav = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function updateNav() {
  // Frosted glass on scroll
  nav.classList.toggle("scrolled", window.scrollY > 50);

  // Active link tracking
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== Email JS =====
(function () {
  emailjs.init({
    publicKey: "VWr3-lbSwERsZJAzw",
    blockHeadless: true,
    limitRate: {
      id: "app",
      throttle: 10000
    }
  });
})();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const message = formData.get("message");

  if (!email || !message) {
    alert("Please fill in both fields!");
    return;
  }

  const serv_id = "service_az9hbqb";
  const temp_id = "template_cet3iyy";

  emailjs
    .send(serv_id, temp_id, {
      from_name: email,
      message
    })
    .then(
      (response) => {
        e.target.reset();
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
});

// ===== Project Slider =====
const slider = document.querySelector(".projects-slider");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".project-card");
let slideIndex = 0;

function showSlide(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;

  prevButton.style.opacity = index === 0 ? "0.3" : "1";
  prevButton.style.pointerEvents = index === 0 ? "none" : "auto";
  nextButton.style.opacity = index === slides.length - 1 ? "0.3" : "1";
  nextButton.style.pointerEvents =
    index === slides.length - 1 ? "none" : "auto";

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

prevButton.addEventListener("click", () => {
  slideIndex = Math.max(slideIndex - 1, 0);
  showSlide(slideIndex);
});

nextButton.addEventListener("click", () => {
  slideIndex = Math.min(slideIndex + 1, slides.length - 1);
  showSlide(slideIndex);
});

showSlide(slideIndex);
