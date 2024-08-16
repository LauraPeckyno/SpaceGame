class Player {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive;
    }
    attack(enemy) {
        const roll = Math.random();
        if (roll <= this.accuracy) {
            console.log(`${this.name} hits ${enemy.name}!`); // is your roll less than your accuracy? 
            // if yes, then roll for damage
            const damage = Math.floor(Math.random() * this.firepower) + 1; /// the math random generates a decimal, which we need to multiply with our accuracy. The result is then rounded and we add 1 to make sure it's at least as much as the least amt of damage.
            console.log(`${enemy.name}'s hull was at ${enemy.hull}`)  // prior state for hull
            enemy.hull -= damage; /// minus damage
            console.log(`${this.name} deals ${damage} damage to ${enemy.name}!`);  // logging the damage
            if (enemy.hull <= 0) {
                enemy.alive = false;
                console.log(`You have defeated ${enemy.name}!`)
            } else {
            console.log(`${enemy.name}'s remaining hull is now ${enemy.hull}`); // logging prior hull minus damage = current hull
            console.log(`It's now ${enemy.name}'s turn.`);
            }
        } else {
            console.log(`${this.name} misses ${enemy.name}!`);  // if no, then miss
            console.log(`It's now ${enemy.name}'s turn.`);
        }
    };
}  /// duplicating the attack from the enemy side to the player side

class Enemy {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive;
    }
    attack(player) {
        // random roll to see if you hit
        const roll = Math.random();
        if (roll <= this.accuracy) {
            console.log(`${this.name} hits ${player.name}!`); // is your roll less than your accuracy? 
            // if yes, then roll for damage
            const damage = Math.floor(Math.random() * this.firepower) + 1;  // random number decimal times the firepower, then rounded. add 1 to ensure it's the minimum amount of damage to hit.
            console.log(`${player.name}'s hull was at ${player.hull}`)  // prior state for player hull
            player.hull -= damage; /// player hull minus damage
            console.log(`${this.name} deals ${damage} to ${player.name}!`);  // damage logged
            if (player.hull <= 0) {
                player.alive = false;
                console.log(`You have been defeated by ${this.name}! Womp... womp...`)
            } else {
            console.log(`${player.name}'s remaining hull is now ${player.hull}`); // logging prior hull minus damage = current hull
            console.log(`It's now ${player.name}'s turn.`);
            }
        } else {
            console.log(`${this.name} misses ${player.name}!`);  // if no, then miss
            console.log(`It's now ${player.name}'s turn.`);
        }
    };
}

const laura = new Player("laura", 20, 5, 0.7, true);
const baddie = new Enemy("baddie", 4, 3, 0.6, true);

////notes/////
//////////////

// how to set up the initial 6 bad guys?
// trigger using the game start button
// use trigger event to run function to get name, random stats
// i don't need to set the class values for everyone at the start. let's randomize for each round
// tracking the death now happens with the alive boolean
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


