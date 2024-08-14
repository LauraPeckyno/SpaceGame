class Player {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
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
            console.log(`${enemy.name}'s remaining hull is now ${enemy.hull}`); // logging prior hull minus damage = current hull
        } else {
            console.log(`${this.name} misses ${enemy.name}!`);  // if no, then miss
        }
    };
}  /// duplicating the attack from the enemy side to the player side

class Enemy {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
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
            console.log(`${player.name}'s hull is now at ${player.hull}`)  // hull state after damage
        } else {
            console.log(`${this.name} misses ${player.name}!`);  // if no, then miss
        }
    };
}
// how should I assign the baddie class stats for each enemy? I guess it should be random.
// how to track each enemy from round to round?
// need to add a defeat state for both the enemy and player
// if player wins, how to move to next baddie?

const laura = new Player("laura", 20, 5, 0.7);
const baddie = new Enemy("baddie", 4, 3, 0.6);

// now, I need to track the hull when it takes damage

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
