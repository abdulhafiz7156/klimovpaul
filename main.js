const headers = document.querySelectorAll("[data-accordion]");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;

    // close all others
    document.querySelectorAll(".service-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    // toggle current
    item.classList.toggle("active");
  });
});

// PLANS slider control — enables slider only on <=1024, disables on desktop
(function () {
  const slider = document.querySelector('.plans-slider');
  const nextBtn = document.querySelector('.plans-btn.next');
  const prevBtn = document.querySelector('.plans-btn.prev');

  if (!slider || !nextBtn || !prevBtn) return;

  // amount to scroll per click — 90% of wrapper width on mobile
  function scrollAmount() {
    return window.innerWidth * 0.9; // прокручиваем на 90% экрана
  }

  function enableSliderMode() {
    nextBtn.style.display = '';
    prevBtn.style.display = '';
    slider.style.overflowX = 'auto';
    // ensure buttons work
    nextBtn.addEventListener('click', onNext);
    prevBtn.addEventListener('click', onPrev);
  }

  function disableSliderMode() {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    slider.style.overflowX = 'visible';
    // reset scroll to start
    slider.scrollLeft = 0;
    nextBtn.removeEventListener('click', onNext);
    prevBtn.removeEventListener('click', onPrev);
  }

  function onNext() {
    slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  }

  function onPrev() {
    slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  }

  // decide initial mode and update on resize
  function updateMode() {
    const mobile = window.innerWidth <= 1024;
    if (mobile) enableSliderMode();
    else disableSliderMode();
  }

  // initialize
  updateMode();
  window.addEventListener('resize', updateMode);

  // accessibility: keyboard arrows for slider when focused
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  });

})();

// BLOGS slider control — enables slider only on mobile <=768px
(function () {
  const slider = document.querySelector('.blogs-slider');

  if (!slider) return;

  function enableSliderMode() {
    slider.style.overflowX = 'auto';
    // Add keyboard navigation
    slider.setAttribute('tabindex', '0');
  }

  function disableSliderMode() {
    slider.style.overflowX = 'visible';
    slider.scrollLeft = 0;
    slider.removeAttribute('tabindex');
  }

  // Keyboard navigation for slider
  function onKeyDown(e) {
    const cardWidth = slider.querySelector('.blog-card')?.offsetWidth || 0;
    const gap = 20; // matches CSS gap
    const scrollAmount = cardWidth + gap;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  // Update mode based on viewport
  function updateMode() {
    const mobile = window.innerWidth <= 768;
    if (mobile) {
      enableSliderMode();
      slider.addEventListener('keydown', onKeyDown);
    } else {
      disableSliderMode();
      slider.removeEventListener('keydown', onKeyDown);
    }
  }

  // Initialize
  updateMode();
  window.addEventListener('resize', updateMode);
})();


const openModalBtns = document.querySelectorAll('.open-modal-btn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Function to open modal and prevent body scroll
function openModal() {
  modal.classList.add('active');
  modalOverlay.classList.add('active');
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

// Function to close modal and restore body scroll
function closeModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
  // Restore body scroll
  document.body.style.overflow = '';
}

openModalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
});

modalClose.addEventListener('click', () => {
  closeModal();
});

modalOverlay.addEventListener('click', () => {
  closeModal();
});

// Phone input mask for CTA section
const phoneInput = document.querySelector('.cta-phone-input');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits

    // Limit to 11 digits (1 for country code + 10 for number)
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Format the number
    let formatted = '+7';

    if (value.length > 1) {
      formatted += ' (' + value.slice(1, 4);
    }
    if (value.length >= 4) {
      formatted += ') ' + value.slice(4, 7);
    }
    if (value.length >= 7) {
      formatted += ' ' + value.slice(7, 9);
    }
    if (value.length >= 9) {
      formatted += ' ' + value.slice(9, 11);
    }

    e.target.value = formatted;
  });

  // Set initial value
  phoneInput.value = '+7 (';

  // Prevent deleting +7
  phoneInput.addEventListener('keydown', (e) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value.length <= 4) {
      e.preventDefault();
      phoneInput.value = '+7 (';
    }
  });
}