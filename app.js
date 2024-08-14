
class Player {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
}

// class Enemy {
//     constructor(name, hull, firepower, accuracy) {
//         this.name = name;
//         this.hull = hull;
//         this.firepower = firepower;
//         this.accuracy = accuracy;
//     }
//     roll(mod = 0) {
//         const result = Math.floor(Math.random() * 20) + 1 + mod;
//         console.log(`${this.name} rolled a ${result}.`)
//     }
// }

const laura = new Player("Laura", 20, 5, 0.7);
// const baddie = new Enemy("baddie", 4, 2, 0.7);

console.log(laura.roll());
// baddie.roll();