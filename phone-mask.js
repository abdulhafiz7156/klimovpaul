(function () {
  const phoneInputs = document.querySelectorAll("input[type='tel'], .cta-phone-input");

  if (!phoneInputs.length) return;

  function formatPhone(value) {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    }

    if (!digits.startsWith("7")) {
      digits = "7" + digits;
    }

    digits = digits.slice(0, 11);

    let formatted = "+7 (";

    if (digits.length > 1) {
      formatted += digits.slice(1, 4);
    }
    if (digits.length >= 4) {
      formatted += ") " + digits.slice(4, 7);
    }
    if (digits.length >= 7) {
      formatted += " " + digits.slice(7, 9);
    }
    if (digits.length >= 9) {
      formatted += " " + digits.slice(9, 11);
    }

    return formatted;
  }

  phoneInputs.forEach((input) => {
    input.setAttribute("placeholder", "+7 (___) ___ __ __");

    if (!input.value.trim() || !input.value.startsWith("+7")) {
      input.value = "+7 (";
    }

    input.addEventListener("focus", () => {
      if (!input.value.trim()) {
        input.value = "+7 (";
      }
    });

    input.addEventListener("input", (event) => {
      event.target.value = formatPhone(event.target.value);
    });

    input.addEventListener("keydown", (event) => {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const deleting = event.key === "Backspace" || event.key === "Delete";
      const prefixLength = 4; // "+7 ("

      if (deleting && input.value.length <= prefixLength && start <= prefixLength && end <= prefixLength) {
        event.preventDefault();
        input.value = "+7 (";
      }
    });
  });
})();
