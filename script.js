
var gameNumber = [];
var numberOfCharacters = 8; 
for (var i = 0; i < numberOfCharacters; i++) {// for loop to generate a assinged number of random numbers
    var number = Math.floor(Math.random() * 10);  // math.random geneerates a random decimal, then x 10 to get a whole number and math.floor removes anything after the decimal point via rounding down so it can never be 10

    while (gameNumber.includes(number)) { // if the number is allready in the array, generate a new number
        number = Math.floor(Math.random() * 10);
    }

    gameNumber.push(number); // push adds the number to the end of the array
}
