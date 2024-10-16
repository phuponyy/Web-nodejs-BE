function toggleSearch() {
  const searchForm = document.getElementById("searchForm");

  // Add/remove the "show" class to trigger animation
  if (searchForm.classList.contains("show")) {
    searchForm.classList.remove("show");
  } else {
    searchForm.classList.add("show");
  }
}

function validatePasswords() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorElement = document.getElementById("passwordError");

  if (password !== confirmPassword) {
    errorElement.classList.add("show");
    errorElement.classList.remove("d-none");
    errorElement.style.visibility = "visible"; // Ensure it shows
    return false;
  } else {
    errorElement.classList.remove("show");
    errorElement.style.visibility = "hidden"; // Hide when passwords match
    return true;
  }
}

if (document.getElementById("password")) {
  document
    .getElementById("togglePassword")
    .addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const currentType = passwordInput.getAttribute("type");
      passwordInput.setAttribute(
        "type",
        currentType === "password" ? "text" : "password"
      );
      // Toggle the icon class between fa-eye and fa-eye-slash
      this.classList.toggle("fa-eye-slash");
    });
}

function initializeAlert() {
  const showAlert = document.querySelector("[show-alert]");
  if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"), 10) || 1500;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
      showAlert.classList.add("alert-hidden");
      setTimeout(() => {
        showAlert.style.display = "none";
      }, 500); // Match the animation duration (500ms)
    }, time);

    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
      setTimeout(() => {
        showAlert.style.display = "none";
      }, 500); // Match the animation duration
    });
  }
}

// Call the function to initialize the alert
initializeAlert();
