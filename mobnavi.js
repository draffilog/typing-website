const backToTop = document.getElementById("back-to-top");

// Toggle the mobile navigation menu
function toggleMobileNavigation() {
  // Get the mobile navigation element
  const mobileNavigation = document.getElementById("mobile-sidenav");
  // Toggle the 'mobile-links-active' class on the mobile navigation element
  mobileNavigation.classList.toggle('mobile-links-active');
}

// Scroll the page to the top
function goToTop() {
  // Set the scroll position of the body and document element to 0
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Show or hide the back to top button based on the scroll position
function scroll() {
  // If the body or document element has been scrolled more than 20px from the top,
  // show the back to top button, otherwise hide it
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}