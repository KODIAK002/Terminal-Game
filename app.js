const prompt = require('prompt-sync')(); // Game baseline
const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);
console.log(' ')

const weapons = {
    Sword: [],
    Bow: [],
    Axe: []

}

const weaponPreference = prompt('What weapon would you like to start with?  | Sword | Axe | Bow | ');
console.log(`Great you have selected ${weaponPreference}, truly a great pick!`);
console.log(" ");
const firstChoice = prompt(`Do you want to complete some training, travel to town, or head to that ominous cave? `);
let pathChoice = prompt(`Now that training is done what would you like to do? Go to the ominious cave(you're insane) or go to town? `);
console.log(` `);

if (firstChoice === "complete some training") {
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
