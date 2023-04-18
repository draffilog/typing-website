// This code is for a slideshow that displays images and allows the user to navigate through them. 
let slideIndex = 1;
showSlides(slideIndex);

// The plusSlides function allows the user to navigate to the next or previous slide
// by passing in a value of 1 or -1 for n.
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// The currentSlide function allows the user to navigate directly to a specific slide 
// by passing in the index of the slide for n.
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// The showSlides function is responsible for displaying the current slide and hiding all the other slides. 
// It takes an argument n which represents the index of the slide to be displayed.
function showSlides(n) {
  let i;
  // The slides and dots variables refer to the elements with the class name "mySlides" and "dot", respectively.
  // These are likely elements in the HTML DOM that represent the images in the slideshow and navigation dots.
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // The if statements at the beginning of the showSlides function check if the slide index is out of bounds 
  // and adjust it accordingly.
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}

  // The for loops that follow are used to hide all the slides and remove the "active" class from all the dots.
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  // The final lines of the function display the correct slide and add the "active" class to the correct dot.
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}