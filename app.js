const prompt = require('prompt-sync')(); // Game baseline
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);
console.log(' ')

const weaponsDamage = {
    Sword: 3,
    Bow: 1,
    Axe: 5
}

let playerHealth = 10;
let playerLevel = 0;

const enemies = {
    bats: {
        batHealth: 2,
        batDamage: 2
    },
    snake: {
        snakeHealth: 5,
        snakeDamage: 4,
    },
    bear: {
        bearHealth: 8,
        bearDamage: 5
    } ,
    arthropleuraIsBoss: {
        arthropleuraHealth: 12,
        arthropleuraDamage: 8
    }
}


const weaponPreference = prompt('What weapon would you like to start with?  | Sword | Axe | Bow | ');
console.log(`Great you have selected ${weaponPreference}, truly a great pick!`);
console.log(" ");
console.log(`Tip: Going back to town heals you and if you die you return to town`);
const firstChoice = prompt(`Do you want to complete some training, travel to town, or head to that ominous cave? `);
let pathChoice = prompt(`Now that training is done what would you like to do? Go to the ominious cave(you're insane) or go to town? `);
console.log(` `);

if (firstChoice === "complete some training") {
    weaponsDamage.Sword = 5
    weaponsDamage.Axe = 7
    weaponsDamage.Bow = 3
    console.log(`Good idea, your weapon damage has gone up by  that will help with fighting the enemies later`);
    console.log(' ');
    console.log(`${pathChoice}`);
}else if (firstChoice === "travel to town") {
    console.log(`Lets go see what they have in town`);
}else {
    console.log(`Now why would you do that, lets do it then`);
}

function closerToCentipede() {
    const next = prompt("Do you want to continue playing? ");
    if ( next === "No" || next === "no") {
        console.log("Okay, take care and your always welcome to come back to play");
        process.exit();
    }else {
        console.log(" ");
    }
}
closerToCentipede();

let weaponSelected =

const enemyWeakness = (weaponSelected)
