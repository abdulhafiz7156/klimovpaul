// Preloader Animation
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.remove();
    }, 800); // match the CSS animation
  }, 1500);
});

// Fixed Header on Scroll
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Parallax Effect for Hero Image
const heroImage = document.querySelector(".hero-image");

if (heroImage) {
  window.addEventListener("scroll", () => {
    // Disable parallax on mobile (<=900px)
    if (window.innerWidth <= 900) {
      heroImage.style.transform = 'translateY(0)';
      return;
    }

    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5; // Adjust this value for more/less parallax effect

    // Only apply parallax when hero is in viewport
    const heroSection = document.querySelector(".hero");
    const heroRect = heroSection.getBoundingClientRect();

    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
      heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });
}

// ========================================
// SERVICES SECTION - GSAP SCROLL DISAPPEAR ANIMATION
// ========================================

const servicesSection = document.querySelector(".services");
// const servicesTitle = document.querySelector(".services-title");
const serviceItems = document.querySelectorAll(".service-item");

if (servicesSection && serviceItems.length > 0) {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Set initial state - all visible
  // gsap.set(servicesTitle, { opacity: 1, y: 0 });
  gsap.set(serviceItems, { opacity: 1, y: 0 });

  // Create timeline for the entire animation sequence
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: servicesSection,
      start: "top top", // Start only when section reaches top of viewport
      end: "bottom 60%", // End when section bottom is 60% from top
      scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
      // markers: true // Uncomment for debugging
    }
  });

  // Keep title visible; animate only service items
  tl.to(serviceItems, {
    opacity: 0,
    y: -50,
    duration: 1,
    stagger: 0.3, // 0.3 second delay between each item
    ease: "power2.out"
  });
}

// ========================================
// ABOUT SECTION ANIMATIONS
// ========================================

// About Image Reveal Animation (.about-image)
// Creates a white overlay that reveals the image from top to bottom
// Wait for page load to avoid conflict with preloader
window.addEventListener("load", () => {
  const aboutImage = document.querySelector(".about-image");

  if (aboutImage) {
    // Small delay to ensure preloader animation starts first
    setTimeout(() => {
      // Create white overlay element
      const overlay = document.createElement("div");
      overlay.className = "about-image-overlay";
      overlay.style.cssText = `
        // position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        transform-origin: bottom;
        z-index: 2;
      `;

      // Make sure about-image has position relative
      aboutImage.style.position = "relative";
      aboutImage.style.overflow = "hidden";

      // Add overlay to image
      aboutImage.appendChild(overlay);

      // Set up Intersection Observer to trigger animation when section enters viewport
      const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: "0px"
      };

      const aboutImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !aboutImage.classList.contains("revealed")) {
            // Mark as revealed to prevent re-triggering
            aboutImage.classList.add("revealed");

            // Animate overlay sliding down to reveal image from top to bottom
            overlay.style.transition = "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)";
            overlay.style.transform = "scaleY(0)";

            // Remove overlay after animation completes
            setTimeout(() => {
              overlay.remove();
            }, 1200);
          }
        });
      }, observerOptions);

      // Start observing the about section
      const aboutSection = document.querySelector(".about-section");
      if (aboutSection) {
        aboutImageObserver.observe(aboutSection);
      }
    }, 1600); // Delay until after preloader is removed (1500ms + 100ms buffer)
  }
});

// About Text Animation (.about-text)
// This uses AOS.js fade-up animation
// Add data-aos="fade-up" attribute to .about-text element in HTML

// ========================================
// CTA SECTION ANIMATIONS
// ========================================

// CTA Image Reveal Animation (.cta-image)
// Creates a white overlay that reveals the image from top to bottom
const ctaImage = document.querySelector(".cta-image");

if (ctaImage) {
  // Create white overlay element
  const ctaOverlay = document.createElement("div");
  ctaOverlay.className = "cta-image-overlay";
  ctaOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    transform-origin: bottom;
    z-index: 2;
  `;

  // Make sure cta-image has position relative
  ctaImage.style.position = "relative";
  ctaImage.style.overflow = "hidden";

  // Add overlay to image
  ctaImage.appendChild(ctaOverlay);

  // Set up Intersection Observer to trigger animation when section enters viewport
  const ctaObserverOptions = {
    threshold: 0.3, // Trigger when 30% of element is visible
    rootMargin: "0px"
  };

  const ctaImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !ctaImage.classList.contains("revealed")) {
        // Mark as revealed to prevent re-triggering
        ctaImage.classList.add("revealed");

        // Animate overlay sliding down to reveal image from top to bottom
        ctaOverlay.style.transition = "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)";
        ctaOverlay.style.transform = "scaleY(0)";

        // Remove overlay after animation completes
        setTimeout(() => {
          ctaOverlay.remove();
        }, 1200);
      }
    });
  }, ctaObserverOptions);

  // Start observing the cta section
  const ctaSection = document.querySelector(".cta-section");
  if (ctaSection) {
    ctaImageObserver.observe(ctaSection);
  }
}

// ========================================
// ABOUT → CTA SCROLL REPLACEMENT EFFECT
// ========================================
// Pins about-section and slides cta-section upward to replace it
// The about-section fades out completely and is hidden behind the cta-section

const aboutSection = document.querySelector(".about-section");
const ctaSectionForReplace = document.querySelector(".cta-section");

if (aboutSection && ctaSectionForReplace) {
  // Create wrapper to control scroll behavior
  const replaceWrapper = document.createElement("div");
  replaceWrapper.className = "about-cta-wrapper";

  // Insert wrapper before about-section
  aboutSection.parentNode.insertBefore(replaceWrapper, aboutSection);

  // Move both sections into the wrapper
  replaceWrapper.appendChild(aboutSection);
  replaceWrapper.appendChild(ctaSectionForReplace);

  // Style the wrapper
  replaceWrapper.style.position = "relative";

  // Calculate heights and set wrapper height
  let aboutHeight = 800;
  let ctaHeight = 0;
  const SCROLL_DISTANCE = 500; // Distance to complete the replacement animation (increased for smoother, slower effect)

  // Get heights after page load
  setTimeout(() => {
    aboutHeight = aboutSection.offsetHeight;
    ctaHeight = ctaSectionForReplace.offsetHeight;

    // Set wrapper height: about height + scroll distance (no need to add cta height)
    // This ensures proper scroll behavior
    replaceWrapper.style.minHeight = `${aboutHeight + SCROLL_DISTANCE}px`;
  }, 100);

  // Make about-section sticky (pinned)
  aboutSection.style.position = "sticky";
  aboutSection.style.top = "0";
  aboutSection.style.zIndex = "1";
  aboutSection.style.willChange = "opacity, transform";
  // Ultra-long transitions for maximum smoothness
  aboutSection.style.transition = "opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)";

  // Position cta-section absolutely to overlay about-section
  ctaSectionForReplace.style.position = "absolute";
  ctaSectionForReplace.style.top = "0";
  ctaSectionForReplace.style.left = "0";
  ctaSectionForReplace.style.right = "0";
  ctaSectionForReplace.style.zIndex = "2";
  ctaSectionForReplace.style.willChange = "transform";
  // Ultra-smooth spring-like easing with extended duration
  ctaSectionForReplace.style.transition = "transform 1.2s cubic-bezier(0.08, 0.82, 0.17, 1)";

  // Enable hardware acceleration for buttery smoothness
  aboutSection.style.transform = "translateZ(0)";
  ctaSectionForReplace.style.transform = "translateZ(0)";
  aboutSection.style.backfaceVisibility = "hidden";
  ctaSectionForReplace.style.backfaceVisibility = "hidden";

  // Ultra-smooth easing function (ease-out-quint - even smoother than quart)
  const easeOutQuint = (t) => {
    return 1 - Math.pow(1 - t, 5);
  };

  // Buttery smooth ease-in-out using sine wave
  const easeInOutSine = (t) => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };

  // Smoothing function to reduce jitter
  let lastProgress = 0;
  const smoothProgress = (currentProgress) => {
    // Interpolate between last and current for extra smoothness
    const smoothed = lastProgress + (currentProgress - lastProgress) * 0.2;
    lastProgress = smoothed;
    return smoothed;
  };

  // Use requestAnimationFrame for 60fps smooth updates
  let ticking = false;
  let currentScrollProgress = 0;

  const updateAnimation = () => {
    const wrapperRect = replaceWrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top;

    // Calculate scroll progress into wrapper
    const scrolledIntoWrapper = -wrapperTop;

    // Phase 1: Before animation starts
    if (scrolledIntoWrapper < 0) {
      ctaSectionForReplace.style.transform = "translateY(100vh) translateZ(0)";
      aboutSection.style.opacity = "1";
      aboutSection.style.transform = "translateY(0) scale(1) translateZ(0)";
      aboutSection.style.visibility = "visible";
      aboutSection.style.filter = "blur(0px)"; // Remove blur when scrolling back
      lastProgress = 0;
    }
    // Phase 2: Animation in progress
    else if (scrolledIntoWrapper >= 0 && scrolledIntoWrapper <= SCROLL_DISTANCE) {
      // Calculate linear progress (0 to 1)
      const linearProgress = Math.min(scrolledIntoWrapper / SCROLL_DISTANCE, 1);

      // Apply smoothing to reduce jitter
      const smoothed = smoothProgress(linearProgress);

      // Apply ultra-smooth easing
      const easedProgress = easeOutQuint(smoothed);
      const fadeProgress = easeInOutSine(smoothed);

      // Slide cta-section up from bottom to top with buttery smooth easing
      const translateY = (1 - easedProgress) * 100; // Start at 100vh, end at 0
      ctaSectionForReplace.style.transform = `translateY(${translateY}vh) translateZ(0)`;

      // Fade out and very slightly scale down the about-section
      aboutSection.style.opacity = (1 - fadeProgress).toString();
      const scaleAmount = 1 - (fadeProgress * 0.015); // Ultra-subtle scale (1 to 0.985)
      const moveUp = fadeProgress * 15; // Gentle 15px movement
      const blur = fadeProgress * 2; // Subtle blur for depth
      aboutSection.style.transform = `translateY(-${moveUp}px) scale(${scaleAmount}) translateZ(0)`;
      aboutSection.style.filter = `blur(${blur}px)`;

      // Make about-section invisible when fully faded
      if (fadeProgress >= 0.98) {
        aboutSection.style.visibility = "hidden";
      } else {
        aboutSection.style.visibility = "visible";
      }
    }
    // Phase 3: Animation complete
    else if (scrolledIntoWrapper > SCROLL_DISTANCE) {
      // Lock cta-section in final position
      ctaSectionForReplace.style.transform = "translateY(0) translateZ(0)";

      // Completely hide about-section
      aboutSection.style.opacity = "0";
      aboutSection.style.visibility = "hidden";
      aboutSection.style.transform = "translateY(-15px) scale(0.985) translateZ(0)";
      aboutSection.style.filter = "blur(2px)";
    }

    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateAnimation);
      ticking = true;
    }
  }, { passive: true });
}
