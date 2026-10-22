# Software Development One A1
# Table Of Contents
[Project Description](#project-description)</br>
[User Profile](#user-profile)</br>
---[User Profile One](#one)</br>
---[User Profile Two](#two)</br>
[User Requirements](#user-requirements)</br>
[System Requirements](#functional-and-non-functional-systems-requirements)</br>
[Main Features](#main-features)</br>
[Testing Plan](#testing-plan)</br>
[Errors and Fixes](#errors-and-fixes-made)</br>
[Refferences](#reffence)</br>
[Pages Deployment](#pages-deployment)</br>
---
## Project Description
</br>

This Project is to implement a bassic web game for which I have chosen numble a game similar to wordle but guessing numbers instead, allowing it to be simpler due to me not being overly familiar with JavaScript. It is simpler by not having to rely on a dictionairy of allowed words instead its awnser generation can be done completly randomly through a list of numbers depending on the users selected dificulty
</br>

---
## User Profile
### One
Alec Bengiman </br>
Age: 25 </br>
Background: </br>
Alec is a graduate accountant working in London, he is looking for something to spend his time during the long commutes on the train. The game should be quick to play easy to understand and replayable. allowing him to easily play multiple games depending on the length of the commute.


--- 
### Two
Samatha Jones </br>
Age: 32 </br>
Background: </br>
Samatha is a data analyst at a majour tech frim in liverpool, they are wanting something to break up the monotony of the day. For this the game must load quickly be accessible on different devices such as mobile and desktop and be quick to play through a round.

</br>

---
## User Requirements
</br>
- Quick Load</br>
- Easy to play</br>
- Replayable</br>
- Dificuluty Levels</br>
- Tutorial</br>
</br>

---
## Functional and non-Functional Systems requirements
The functional systems include a random number generator, working keypad, and colour coding for the numbers guessed. One thing to add would be opening up the boxes to keyboard inputs, this was not done due to the extra validation being required and I did not feel it was nessercery.
</br>
</br>

---
## Main Features
Upon opening the game you are greeted with a tutorial page explaining the bassic rules of play with a large button to continue onto the main screen.<br>
<img src=".\imgs\index.png" alt="Landing Page"><br>
<br>
The main screen allows you to easily flick through the different difficulities showing how many numbers you would need to guess and how many attempts you get.<br>
<img src=".\imgs\main.png" alt="Main Screen"><br>
<br>
If you are successful you get a simple win screen showing you the final number and offering to let you play again you can also select a different dificulty at any point.<br>
<img src=".\imgs\win.png" alt="Win Screen"><br>
<br>
When you make a guess any numbers that do not apear in the sequence get greyed out on the keypad as there is no benifit to entering an incorect number.<br>
<img src=".\imgs\greyedKeypad.png" alt="Keypad Demo"><br>
<br>
If you are unable to guess the number within the aloted mount of trys you get a lose screen that also displays the correct guess at the bottom.<br>
<img src=".\imgs\lose.png" alt="Loose Screen"><br>
</br>

---
## Testing Plan
</br>

|Test No | Test Description | Expected Outcome | Actual Outcome | Steps needed | 
| ------------- | ------------- | ------------- | ------------- | ------------- |
| One  | Entering a number that is part of the awnser in its correct place | The box should turn green  | The box turned green  | None needed  |
| Two  | Entering a number that is not part of the number  | It should show as grey on the keypad and its box | They keypad turned grey and dissabled that number and the previous guess showed as grey | None Needed  |
| Three | Entering a number that is part of the awnser but in the wrong place | The cell should turn yellow  | The cell turns yellow | None Needed  |
| Four | Game win state is achievable in all dificulties | All correct values across easy medium or hard should result in game win   | All game dificulties are winable  | None needed  |
| Five  | Game is loseable when out of guesses | When out of guesses lose screen and awnser are revieled  | The lose screen displays as well as showing the awnser  | None needed  |
| Six  | Changing difculty between levels  | The dificulty state should change  | The dificulty state changes | None Needed  |
| Seven  | Able to enter the same number multiple times in a guess  | Should be able to fill the guess box with the same digit  | You can fill the guess box with the same digit  | None Needed |
| Eight | Unable to enter an incomplete guess  | When waiting for all digits to be chosen the enter button is disabled  | The enter button is dissabled correctly and renables when guess is full  | None needed  |
| Nine | Should be able to start a game after a loss  | By either clicking play again or a new dificulty you can start a fresh game  | When clicking start again or selecting a new dificulty it resets the game state  | None needed  |
| Ten  | You can change difficulty during a game  | When clicking on a different dificulty mid game the game sate should reset to the new dificulty  | The game state resets to the new dificulty  | None needed  |


</br>

---
## Errors and fixes made
</br>

### Error One -- Game reset
Problem: Starting a new round needed to reset the previous game so that old guesses and the previous answer would not carry over.

Fix: A startGame() function was used to reset the hidden number, current guess, attempt counter and game state. It also clears the previous guess grid and generates a new number.

Testing: Started a new game after winning and losing to check that the previous guesses were removed and a new round could be played.

### Error Two -- Prevention of incomplete guesses
Problem: Players should not be able to submit a guess before filling all the number boxes.

Fix: The Enter button was set to remain disabled until the current guess contains the required number of digits. The updateNumberBoxes() function updates the button state whenever a number is added or deleted.

Testing: Tried to submit an incomplete guess and checked that the Enter button remained disabled until all the boxes were filled.

### Error Three – Handling Incorrect Numbers on the Keypad

Problem: Numbers that were not present in the hidden answer needed to be identified so that players could avoid using them in future guesses.

Fix: The game checks each number in the submitted guess against the hidden number. If a number is not present, the disableKeypadButton() function disables that number on the keypad.

Testing: Submitted a guess containing numbers that were not in the answer and checked that those numbers became greyed out and could no longer be selected.

</br>

---


### Credits
Bootstrap and W3Schools for CSS and HTML,  
Freecodecamp for javascript
</br>

### Pages Deployment

https://fainthorizon.github.io/Software-Development-A1/