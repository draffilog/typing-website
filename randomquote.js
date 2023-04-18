 // Create a variable to store the start time
 var startTime;
                
 window.onload = function() {
   startTime = Date.now();
 };

 // Create a variable to store the correct paragraph
 var correctParagraph;

 // Make an HTTP GET request to the Quotable API to retrieve a random quote
 fetch('http://api.quotable.io/random')
   .then(response => response.json())
   .then(data => {
     // Set the innerHTML of the paragraph element to the quote
     document.getElementById("paragraph").innerHTML = data.content;
     // Set the correctParagraph variable to the quote
     correctParagraph = data.content;
   });

 function checkTyping() {
   // Get the user's input
   var input = document.getElementById("typing-area").value;

   // Split the input and the correct paragraph into arrays of individual letters
   var inputLetters = input.split("");
   var correctLetters = correctParagraph.split("");

   // Loop through the arrays and compare each letter
   for (var i = 0; i < inputLetters.length; i++) {
     // If the letters don't match, highlight the input letter in red
     if (inputLetters[i] !== correctLetters[i]) {
       inputLetters[i] = '<span style="color: red">' + inputLetters[i] + '</span>';
     }
   }

   // Join the arrays back into strings and update the textarea with the highlighted input
   document.getElementById("typing-area").innerHTML = inputLetters.join("");
 }

 function checkAnswer() {
   // Get the paragraph and the typing area
   var paragraph = document.getElementById("paragraph");
   var typingArea = document.getElementById("typing-area");

   // Compare the paragraph and the typing area
   if (paragraph.innerHTML == typingArea.value) {
     // If they match, show a success message
     document.getElementById("result").innerHTML = '<strong style="font-size: 27px">Correct! You are a fast and accurate typer.</strong>';

     // Calculate the typing speed and percentage of accuracy
     var elapsedTime = Date.now() - startTime; // Calculate the elapsed time in milliseconds
     var words = paragraph.innerHTML.split(" ").length; // Get the number of words in the paragraph
     var typingSpeed = Math.round(words / (elapsedTime / 1000 / 60)); // Calculate the typing speed in words per minute
     var accuracy = 0; // Initialize the accuracy to 0
     for (var i = 0; i < paragraph.innerHTML.length; i++) {
       // Iterate through the characters in the paragraph and the user's input
       if (paragraph.innerHTML[i] != typingArea.value[i]) {
         accuracy++; // If the characters match, increment the accuracy
       }
     }
     accuracy = Math.round((typingArea.value.length - accuracy) / paragraph.innerHTML.length * 100);
document.getElementById("result").innerHTML +=
 " Your typing speed is " +
 typingSpeed +
 " words per minute, and final accuracy of your text is " +
 accuracy +
 "%.";

// Hide the textarea and the "Check Answer" button
typingArea.style.display = "none";
document.getElementById("check-answer-button").style.display = "none";
} else {
// If they don't match, show an error message
document.getElementById("result").innerHTML = "Incorrect. Please continue typing.";
}
}

// Add an event listener to the textarea to check the answer as the user types
document
.getElementById("typing-area")
.addEventListener("input", checkAnswer);

function restartTypingTest() {
    // Set the start time to the current time
    startTime = Date.now();
  
    // Reset the text in the paragraph element to a new quote from the Quotable API
    fetch('http://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        document.getElementById("paragraph").innerHTML = data.content;
        correctParagraph = data.content;
      });
  
    // Reset the text in the typing area to an empty string
    document.getElementById("typing-area").value = "";
  
    // Reset the result element to an empty string
    document.getElementById("result").innerHTML = "";
  
    // Display the typing area and the "Check Answer" button
    document.getElementById("typing-area").style.display = "block";
    document.getElementById("check-answer-button").style.display = "block"
  }

  document.addEventListener("keydown", function(event) {
    if (event.code === "Tab") {
      restartTypingTest();
    }
  });