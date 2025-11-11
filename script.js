// Header Scroll Effect
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  nav.classList.toggle("active");
});

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    nav.classList.remove("active");
  });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Create Animated Particles for Hero
const particlesContainer = document.getElementById("particles");
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  // Give hero particles small randomized offsets (used by the random movement keyframes)
  particle.style.setProperty("--x", `${Math.random() * 200 - 100}px`);
  particle.style.setProperty("--y", `${Math.random() * 200 - 100}px`);
  // Use shorter durations for the more lively, random hero motion
  particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
  particle.style.animationDelay = `${Math.random() * 2}s`;
  particlesContainer.appendChild(particle);
}

// Create Animated Particles for CTA
const ctaParticlesContainer = document.getElementById("ctaParticles");
const ctaParticleCount = 30;

for (let i = 0; i < ctaParticleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "cta-particle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  // CTA particles will now follow the long upward float motion (like the previous hero)
  // Remove per-particle random offsets and give them longer durations so they drift slowly
  particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  ctaParticlesContainer.appendChild(particle);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      // For staggered animations in grids
      if (
        entry.target.parentElement.classList.contains("capabilities-grid") ||
        entry.target.parentElement.classList.contains("process-grid") ||
        entry.target.parentElement.classList.contains("industries-grid") ||
        entry.target.parentElement.classList.contains("stats-grid")
      ) {
        const cards = Array.from(entry.target.parentElement.children);
        const index = cards.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    }
  });
}, observerOptions);

// Observe all elements with data-animate attribute
const animatedElements = document.querySelectorAll("[data-animate]");
animatedElements.forEach((el) => observer.observe(el));

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(
      startValue + (target - startValue) * easeOutQuart
    );

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Observer for counter animations
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        if (!counter.classList.contains("counted")) {
          counter.classList.add("counted");
          animateCounter(counter, target);
        }
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => counterObserver.observe(counter));

// Smooth Scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add hover effects to cards
const cards = document.querySelectorAll(
  ".capability-card, .industry-card, .highlight-card"
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Parallax effect for hero gradient
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const heroGradient = document.querySelector(".hero-gradient");

  if (heroGradient) {
    heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Button ripple effect
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", createRipple);
});

// Add ripple styles dynamically
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cursor trail effect (optional, for extra animation)
const trail = [];
const trailLength = 20;

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    // Only on desktop
    const dot = document.createElement("div");
    dot.className = "cursor-trail";
    dot.style.left = e.pageX + "px";
    dot.style.top = e.pageY + "px";
    document.body.appendChild(dot);

    trail.push(dot);
    if (trail.length > trailLength) {
      const oldDot = trail.shift();
      oldDot.remove();
    }

    setTimeout(() => {
      dot.style.opacity = "0";
      setTimeout(() => dot.remove(), 300);
    }, 300);
  }
});

// Add cursor trail styles
const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
    .cursor-trail {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(6, 182, 212, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(cursorStyle);

// Tilt effect on cards (excluding stat-card and process-card)
const tiltCards = document.querySelectorAll(
  ".capability-card, .industry-card, .highlight-card"
);
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// FAQ Toggle Functionality
const faqToggles = document.querySelectorAll(".faq-toggle");

faqToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    // Close all other FAQs
    faqToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        otherToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle current FAQ
    toggle.setAttribute("aria-expanded", !isExpanded);
  });
});

// Close FAQ on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    faqToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
    });
  }
});

// Mobile menu ARIA updates
mobileMenuBtn.addEventListener("click", () => {
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
});

console.log("SwayAnalytics.ai - From Data to Decisions 🚀");
