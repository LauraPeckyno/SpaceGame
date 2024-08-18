///notes///
///////////
/// I've decided to reskin this as a fishing game. 
/// Instead of it being hull integrity, those values will become stamina. 
/// With each attempted catch, you will potentially lose stamina.
/// if you lose too much stamina, you give up on the fishing and go home.
/// if you catch all six fish in the pond, you win.
/// I'll be reworking the graphics and language to fit this new scenario. It just feels better than a space shoot em up.


// set up the variables
let roundNumber = 0;  // for the round toggle
let fishNumbers = 6;  // sets initial number of enemies
let fishes = [];  // array to hold fish objects
let currentFish;  // variable to hold the current enemy
let player;  // variable to hold the player object

// buttons
const newGameBtn = document.querySelector(".start"); // start game button
const castBtn = document.querySelector(".attack"); // attack button
const retreatBtn = document.querySelector(".retreat"); // retreat button
const instructBtn = document.querySelector(".instructions"); // instructions button
const resetBtn = document.querySelector(".reset"); // reset button

// window panes
const actionPane = document.querySelector(".action"); // action pane
const fishPane = document.querySelector(".enemy"); // enemy pane
const roundPane = document.querySelector(".round"); // round notifications pane

// reset btns and window
const confirmationWindow = document.getElementById("confirmation-window");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");

// instructions popup window and close button
const instructionsPopup = document.getElementById("instructions-popup");
const closeInstructionsBtn = document.getElementById("close-instructions-btn");

// event listeners
newGameBtn.addEventListener("click", startGame);
castBtn.addEventListener("click", playerCast);
retreatBtn.addEventListener("click", giveUp);
instructBtn.addEventListener("click", instructions);
resetBtn.addEventListener("click", resetGame);
closeInstructionsBtn.addEventListener("click", hideInstructions);

// the fish screen elements
const fishElements = [
    document.getElementById('fish1'),
    document.getElementById('fish2'),
    document.getElementById('fish3'),
    document.getElementById('fish4'),
    document.getElementById('fish5'),
    document.getElementById('fish6')
];

let fishDiv1 = document.getElementById("fish1");
let fishDiv2 = document.getElementById("fish2");
let fishDiv3 = document.getElementById("fish3");
let fishDiv4 = document.getElementById("fish4");
let fishDiv5 = document.getElementById("fish5");
let fishDiv6 = document.getElementById("fish6");

// build the classes: player and enemy
class Player {
    constructor(name, stamina, bait, skill) {
        this.name = name;
        this.stamina = stamina;
        this.bait = bait;
        this.skill = skill;
        this.alive = true;
        this.playerCast = this.playerCast.bind(this);
    }
    playerCast(fish) {
        const playerRoll = Math.random();
        if (playerRoll <= this.skill) {
            console.log(`You have a bite from ${fish.name}!`);
            roundPane.innerHTML += `You cast your line. You have a bite!<br>`;
            const damage = Math.floor(Math.random() * this.bait) + 1;
            console.log(`${fish.name}'s stamina was at ${fish.stamina}`);
            fish.stamina -= damage;
            console.log(`You manage to bring the fish towards you and weaken ${fish.name} by ${damage}!`);
            roundPane.innerHTML += `You manage to reel the fish towards you and weaken it by ${damage} of stamina!<br>`;
            if (fish.stamina <= 0) {
                fish.alive = false;
                console.log(`You have caught ${fish.name}!`);
                roundPane.innerHTML += `You have caught a fish!<br><img src="https://www.pecknotes.com/black%20snapper.gif"
                        height="150px" width="150px"><br>`;
                fishElements.forEach((element, index) => {
                    if (`fish${index}` === fish.name) {  // check index for current fish
                        element.style.display = 'none'; // setting it to display none when caught
                    }
                });
                if (fishes.length > 0) {
                    currentFish = fishes.shift();  // Move to the next fish
                    console.log(`Next fish: ${currentFish.name}`);
                    roundPane.innerHTML += `Next fish: ${currentFish.name}...<br>`;
                } else {
                    console.log(`You've caught enough fish for dinner! Take a well-earned break!`);
                    roundPane.innerHTML += `YOU WIN!<br>You've caught enough fish for dinner!<br><img src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-hand-painted-fish-and-chips-png-image_4124502.jpg"
                        height="150px" width="150px"><br><strong>Take a well-earned break!</strong><br>`;
                }
            } else {
                console.log(`${fish.name}'s remaining stamina is now ${fish.stamina}`);
                console.log(`The fish on your line is trying to get away! It's now ${fish.name}'s turn.`);
                roundPane.innerHTML += `The fish on your line is trying to get away!<br>It's now ${fish.name}'s turn.<br>They will try to swim free.<br>`;
                fish.fishRun(player);
            }
        } else {
            console.log(`You weren't able to reel the fish towards you this time. They are putting up a fight!`);
            roundPane.innerHTML += `You weren't able to reel the fish towards you this time.<br>They are putting up a fight!<br>`;
            console.log(`It's now ${fish.name}'s turn.`);
            roundPane.innerHTML += `It's now ${fish.name}'s turn.<br>`;
            fish.fishRun(player);
        }
    }
}

class Fish {
    constructor(name, stamina, hunger, skill) {
        this.name = name;
        this.stamina = stamina;
        this.hunger = hunger;
        this.skill = skill;
        this.alive = true;
        this.fishRun = this.fishRun.bind(this);
    }
    fishRun(player) {
        const fishRoll = Math.random();
        if (fishRoll <= this.skill) {
            console.log(`The fish runs from ${player.name}!<br>`);
            roundPane.innerHTML += `This fish is trying to run away from you!<br>Can you hold on?<br>`;
            const damage = Math.floor(Math.random() * this.hunger) + 1;
            console.log(`${player.name}'s stamina was at ${player.stamina}`);
            player.stamina -= damage;
            console.log(`${this.name} is really tiring you out! You hold onto the line, but your stamina is reduced by ${damage}!`);
            roundPane.innerHTML += `You are getting tired!<br>You hold onto the line, but your stamina is reduced by ${damage}!<br>`;
            if (player.stamina <= 0) {
                player.alive = false;
                console.log(`Oh no! Your fish got away! You are now so tired that you need a nap. Go home!`);
                roundPane.innerHTML += `Oh no! Your fish got away!<br>You are now so tired that you need a nap.<br><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/09daf8c3-21f2-4241-a8cf-73c71457ade5/d9o7slj-c5074ebb-09bd-4660-a07c-569c884afbc0.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5ZGFmOGMzLTIxZjItNDI0MS1hOGNmLTczYzcxNDU3YWRlNVwvZDlvN3Nsai1jNTA3NGViYi0wOWJkLTQ2NjAtYTA3Yy01NjljODg0YWZiYzAuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dA5H3cVvOsCqqVT1LgrTdVoB2ILEgiyEStuHGahde04" width="200px"><strong>Go home!</strong><br>`;
            } else {
                console.log(`Your remaining stamina is now ${player.stamina}`);
                roundPane.innerHTML += `Your remaining stamina is now ${player.stamina}.<br>`;
                console.log(`It's time to try to reel that fish in again. ${player.name}'s turn.`);
                roundPane.innerHTML += `It's time to try to reel that fish in again.<br>It's your turn.<br> Hit the cast/Reel button to try again.<br>`;
            }
        } else {
            console.log(`${this.name} tried to run, but you kept them on the line. Try to reel them in again, ${player.name}!`);
            roundPane.innerHTML += `The fish tried to run, but you kept them on the line.<br>Try to reel them in again by hitting the cast/reel button.<br>`;
            console.log(`It's now ${player.name}'s turn.`);
            // roundPane.innerHTML += `It's now ${player.name}'s turn.`;
        }
    }
}

// way to start the game
function startGame() {
    player = new Player("laura", 20, 5, 0.7);
    const staminaRandom = () => Math.floor(Math.random() * 4) + 3;
    const hungerRandom = () => Math.floor(Math.random() * 3) + 2;
    const skillRandom = () => (Math.floor(Math.random() * 3) + 6) / 10;
    roundPane.innerHTML = ""; // Clear the text at the beginning of the new game
    for (let i = 0; i < fishNumbers; i++) {
        const stamina = staminaRandom();
        const hunger = hungerRandom();
        const skill = skillRandom();
        fishes.push(new Fish(`fish${i}`, stamina, hunger, skill));
    }
    currentFish = fishes.shift();
    console.log(`First fish: ${currentFish.name} is ready`);
    newGameBtn.style.display = "none"; // start game button hidden
    roundPane.innerHTML = "Click the Cast & Reel button to cast your line."; // instrucitons
}

// way to attack. Will be the players attack, then the enemy attack will follow automatically
function playerCast() {
    roundPane.innerHTML = ""; // Clear the text on each round
    player.playerCast(currentFish);
}

// retreat function
function giveUp() {
    // retreat dialog
    resetGame();
}

function instructions() {
    // need popup window with game instructions
    instructionsPopup.style.display = "block";
}

function resetGame() {
    confirmationWindow.style.display = "block";
    confirmBtn.onclick = function () {
        newGameBtn.style.display = "block"; // show the new game button again
        fishDiv1.style.display = "block"; // reset all fish elements to display
        fishDiv2.style.display = "block";
        fishDiv3.style.display = "block";
        fishDiv4.style.display = "block";
        fishDiv5.style.display = "block";
        fishDiv6.style.display = "block";
        roundPane.innerHTML = ""; // Clear the text on reset
        location.reload();
        confirmationWindow.style.display = "none";
    };
    cancelBtn.onclick = function () {
        confirmationWindow.style.display = "none";
    };
}

// Function to hide the instructions popup window
function hideInstructions() {
    instructionsPopup.style.display = "none";
}
////notes/////
//////////////

// how to set up the initial 6 bad guys?
// trigger using the game start button
// use trigger event to run function to get name, random stats
// i don't need to set the class values for everyone at the start. let's randomize for each round
// this is where the round toggle might work


// how should I assign the baddie class stats for each enemy? I guess it should be random.
// potential functions for enemy randomization
// Math.floor(Math.random() * 3) + 2;    // 2-4 firepower?
// Math.floor(Math.random() * 4) + 3;    // 3-6 hull?
// (Math.floor(Math.random() * 3) + 6) / 10;    // 0.6-0.8 accuracy for enemy?

// testing function to pick a random enemy name for the alien. Is this even necessary?
// function getEnemyName() {
//     const enemyNames = [
//       "baddie1",
//       "baddie2",
//       "baddie3",
//       "baddie4",
//       "baddie5",
//       "baddie6",
//     ];
//     return enemyNames[Math.floor(Math.random() * enemyNames.length)]; // random number times the number of enemy names, rounded to integer, snag that name from the list
//   }

// how to track each enemy from round to round?
// on defeat, remove current baddie from group, get next one?
// what if the round counter is a visualization of the enemeies left?

// if player wins, how to move to next baddie?
// round toggle?

// add isAlive to Class?  yes

//health counter/bar?


/// from the assignment brief ---function to determine hit accuracy
// if (Math.random() < Enemy[0].accuracy) {
// 	console.log('You have been hit!');
// };
// random roll a number for your attack against the current enemy
// numbers <= accuracy are a hit?
// damage =
// determine the damage, then determine how much hull is left

// three rolls?  one to see if you hit and one to see the damage (roll times accuracy), then

// /// our name = USS Assembly
/// there are 6 enemy ships

// Ship Properties
// hull is the same as hitpoints. If hull reaches 0or less, the ship is destroyed
// firepower is the amount of damage done to the hull of the target with a successful hit
// accuracy is the chance between 0 and 1 that the ship will hit its target
// Your spaceship, the USS Assembly should have the following properties:

// hull - 20
// firepower - 5
// accuracy - .7
// The alien ships should each have the following ranged properties determined randomly:

// hull - between 3 and 6
// firepower - between 2 and 4
// accuracy - between .6 and .8
// You could be battling six alien ships each with unique values.

// The aliens attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. \
// You have the initiative and get to attack first. You can only attack the aliens in order.
// After you have destroyed a ship, you have the option to make a hasty retreat. Retreat = defeat

// A game round would look like this:
// You attack the first alien ship
// If the ship survives, it attacks you
// If you survive, you attack the ship again
// If it survives, it attacks you again ... etc
// If you destroy the ship, you have the option to attack the next ship or to retreat
// If you retreat, the game is over, perhaps leaving the game open for further developments or options
// You win the game if you destroy all of the aliens
// You lose the game if you are destroyed


