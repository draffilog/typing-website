from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/check-typing')
def check_typing():
  # Get the user's input
  input = request.args.get('input')

  # Split the input and the correct paragraph into arrays of individual letters
  input_letters = input.split("")
  correct_letters = "The quick brown fox jumps over the lazy dog.".split("")

  # Loop through the arrays and compare each letter
  for i in range(len(input_letters)):
    # If the letters don't match, highlight the input letter in red
    if input_letters[i] != correct_letters[i]:
      input_letters[i] = '<span style="color: red">' + input_letters[i] + '</span>'

  # Join the arrays back into strings and return the highlighted input
  return "".join(input_letters)

@app.route('/check-answer')
def check_answer():
  # Get the paragraph and the typing area
  paragraph = "The quick brown fox jumps over the lazy dog."
  typing_area = request.args.get('typing_area')

  # Compare the paragraph and the typing area
  if paragraph == typing_area:
    # If they match, show a success message
    result = "Correct! You are a fast and accurate typer."

    # Calculate the typing speed and percentage of accuracy
    elapsed_time = float(request.args.get('elapsed_time'))
    words = len(paragraph.split(" "))
    typing_speed = round(words / (elapsed_time / 1000 / 60))
    accuracy = 0
    for i in range(len(paragraph)):
      # Iterate through the characters in the paragraph and the user's input
      if paragraph[i] != typing_area[i]:
        accuracy += 1
    accuracy = round((len(typing_area) - accuracy) / len(paragraph) * 100)
    result += f" Your typing speed is {typing_speed} words per minute, and final accuracy of your text is {accuracy}%."
  else:
    # If they don't match, show an error message
    result = "Incorrect. Please try again."

  return result

if __name__ == '__main__':
  app.run()
