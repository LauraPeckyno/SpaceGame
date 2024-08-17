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
let enemyNumbers = 6;  // sets initial number of enemies
let enemies = [];  // array to hold enemy objects
let currentEnemy;  // variable to hold the current enemy
let player;  // variable to hold the player object

// add listener event for start game button
// triggers creation of enemies, add player and enemies to stage
// maybe hide attack button until after game start?

// buttons
const newGameBtn = document.querySelector(".start"); // start game button
const attackBtn = document.querySelector(".attack"); // attack button
const retreatBtn = document.querySelector(".retreat"); // retreat button
const instuctBtn = document.querySelector(".instructions"); // instructions button
// window panes
const actionPane = document.querySelector(".action"); // action pane
const playerPane = document.querySelector(".player"); // player pane
const enemyPane = document.querySelector(".enemy"); // enemy pane
// event listeners
newGameBtn.addEventListener("click", startGame);
attackBtn.addEventListener("click", playerAttack);
retreatBtn.addEventListener("click", giveUp);
instuctBtn.addEventListener("click", instructions);

/// build the classes: player and enemy
class Player {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive = true;
        this.playerAttack = this.playerAttack.bind(this)
    }
    playerAttack(enemy) {
        const playerRoll = Math.random();
        if (playerRoll <= this.accuracy) {
            console.log(`${this.name} hits ${enemy.name}!`); // is your roll less than your accuracy? 
            // if yes, then roll for damage
            const damage = Math.floor(Math.random() * this.firepower) + 1; /// the math random generates a decimal, which we need to multiply with our accuracy. The result is then rounded and we add 1 to make sure it's at least as much as the least amt of damage.
            console.log(`${enemy.name}'s hull was at ${enemy.hull}`)  // prior state for hull
            // send this to the actions pane
            enemy.hull -= damage; /// minus damage
            console.log(`${this.name} deals ${damage} damage to ${enemy.name}!`);  // logging the damage
            if (enemy.hull <= 0) {
                enemy.alive = false; // defeat state means alive = false
                console.log(`You have defeated ${enemy.name}!`)
                // send this to the actions pane?
                // toggle round to next 
                // if # enemies > 0, next enemy
                // if # enemies <= 0, display winner! end game
                if (enemies.length > 0) {
                    currentEnemy = enemies.shift();
                    console.log(`Next enemy: ${currentEnemy.name}`);
                    // send this to the actions pane
                } else {
                    console.log(`You won!`);
                    // send this to the actions pane
                    attackBtn.disabled = true;
                }
            } else {
            console.log(`${enemy.name}'s remaining hull is now ${enemy.hull}`); // logging prior hull minus damage = current hull
            console.log(`It's now ${enemy.name}'s turn.`);
            // send this to the actions pane
            enemy.enemyAttack(player);
            }
        } else {
            console.log(`${this.name} misses ${enemy.name}!`);  // if no, then miss
            console.log(`It's now ${enemy.name}'s turn.`);
            // send this to the actions pane
            enemy.enemyAttack(player);
        }
    };
}  /// duplicating the attack from the enemy side to the player side

class Enemy {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive = true;
        this.enemyAttack = this.enemyAttack.bind(this)
    }
    enemyAttack(player) {
        // random roll to see if you hit
        const enemyRoll = Math.random();
        if (enemyRoll <= this.accuracy) {
            console.log(`${this.name} hits ${player.name}!`); // is your roll less than your accuracy? 
            // send this to the actions pane
            // if yes, then roll for damage
            const damage = Math.floor(Math.random() * this.firepower) + 1;  // random number decimal times the firepower, then rounded. add 1 to ensure it's the minimum amount of damage to hit.
            console.log(`${player.name}'s hull was at ${player.hull}`)  // prior state for player hull
            // send this to the actions pane
            player.hull -= damage; /// player hull minus damage
            console.log(`${this.name} deals ${damage} to ${player.name}!`);  // damage logged
            // send this to the actions pane
            if (player.hull <= 0) {
                player.alive = false; // defeat state means alive = false
                console.log(`You have been defeated by ${this.name}! Womp... womp...`)
                // display defeat - end game
                // send this to the actions pane
                attackBtn.style.display = "block";
            } else {
            console.log(`${player.name}'s remaining hull is now ${player.hull}`); // logging prior hull minus damage = current hull
            console.log(`It's now ${player.name}'s turn.`);
            // send this to the actions pane
            }
        } else {
            console.log(`${this.name} misses ${player.name}!`);  // if no, then miss
            console.log(`It's now ${player.name}'s turn.`);
            // send this to the actions pane
        }
    };
};

// way to start the game
function startGame() {
    player = new Player("laura", 20, 5, 0.7);
    const hullRandom = () => Math.floor(Math.random() * 4) + 3;   // 3-6 hull
    const firepowerRandom = () => Math.floor(Math.random() * 3) + 2;    // 2-4 firepower
    const accuracyRandom = () => (Math.floor(Math.random() * 3) + 6) / 10;    // 0.6-0.8 accuracy
    for (let i = 0; i < enemyNumbers; i++) {
        const hull = hullRandom();
        const firepower = firepowerRandom();
        const accuracy = accuracyRandom();
        enemies.push(new Enemy(`baddie${i}`, hull, firepower, accuracy));
    };
    currentEnemy = enemies.shift();
    console.log(`First enemy: ${currentEnemy.name} is ready`);
    
    attackBtn.disabled = false;
    newGameBtn.disabled = true;
};

// way to attack. Will be the players attack, then the enemy attack will follow automatically
function playerAttack() {
    player.playerAttack(currentEnemy);
}

// retreat function
function giveUp() {
    // need prompt to make sure they want to give up
    // retreat message
    // hit the start game to try again
}

function instructions() {
    // need popup window with game instructions
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


