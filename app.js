const prompt = require('prompt-sync')(); // Game baseline
const weaponsDamage = {
    Sword: 3,
    Bow: 1,
    Axe: 5
}

// weaponsDamage.Sword = 5
// weaponsDamage.Axe = 7
// weaponsDamage.Bow = 3

let playerHealth = 10; //player will get 2.5 health per level up
let playerLevel = 1; //every enemy kill gives them a level, max level is 5
let playerLocation = 'town';
let justRespawned = false;
let hasTrained = false;


const enemies = {
    bats: {
        name: "bats",
        batHealth: 2,
        batDamage: 2,
        weakness: "Bow"
    },
    snake: {
        name: "snakes",
        snakeHealth: 5,
        snakeDamage: 4,
        weakness: "Sword"
    },
    bear: {
        name: "bear",
        bearHealth: 8,
        bearDamage: 5,
         weakness: "Axe"
    } ,
    arthropleuraIsBoss: {
        name: "arthropleura",
        arthropleuraHealth: 12,
        arthropleuraDamage: 8
    }
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

function getToCave () {
  const caveReady = prompt(`Ready to go to the cave for some treasure? `)
  if ( caveReady === "yes" || caveReady === "Yes") {
    console.log(`Traveling to the cave...`);
  }  else {
    console.log(`You decide to stay in town for now`);
  }
}

function returnToTown() {
  console.log("You have been defeated... You awaken in the town square.");
  playerHealth = 10;
  playerLocation = 'town';
  justRespawned = true; // Set the flag to true because the player just died.
}

function selectWeapon() {
  // Create the text to show the player, e.g., "Select your weapon: | Sword | Axe | Bow |"
  // It does this automatically by getting the weapon names ('keys') from the weaponsDamage object
  // and joining them together with ' | ' as a separator.
  const promptText = `Select your weapon: | ${Object.keys(weaponsDamage).join(' | ')} |`;

  // This is an infinite loop that forces the player to enter a valid weapon.
  // The only way to exit this loop is by using the 'return' keyword.
  while (true) {
    // Ask the player for their choice using the generated prompt text.
    const choice = prompt(promptText);

    // Check if the player's typed 'choice' exists as a key in the weaponsDamage object.
    // For example, if choice is "Sword", `("Sword" in weaponsDamage)` is true.
    // If choice is "Gun", `("Gun" in weaponsDamage)` is false.
    if (choice in weaponsDamage) {
      // If the weapon is valid, tell the player what they picked.
      console.log(`You have selected the ${choice}!`);

      // Exit the function and send back an object containing both the weapon's
      // name and its corresponding damage value.
      return { name: choice, damage: weaponsDamage[choice] };
    } else {
      // If the weapon is not valid, show an error and the 'while' loop will repeat.
      console.log("Invalid weapon. Please try again.");
    }
  }
}



// This function manages a complete battle between the player and a single enemy.
// It takes one argument: the 'enemy' object that the player will fight.
function fight(enemy) {
  console.log(`A wild ${enemy.name} appears!`);
  let enemyHealth = enemy.health;

  while (playerHealth > 0 && enemyHealth > 0) {
    const selectedWeapon = selectWeapon();
    if (Math.random() < 0.85) {
      enemyHealth -= selectedWeapon.damage;
      console.log(`HIT! You attack the ${enemy.name}. Its health is now ${enemyHealth > 0 ? enemyHealth : 0}.`);
    } else {
      console.log("MISS! Your attack failed.");
    }
    if (enemyHealth <= 0) {
      console.log(`Congratulations! You defeated the ${enemy.name}!`);
      playerLevel++;
      console.log(`You grew to level ${playerLevel}!\n`);
      return true;
    }

    console.log(`The ${enemy.name} prepares to attack...`);
    if (Math.random() < 0.5) {
      playerHealth -= enemy.damage;
      console.log(`HIT! The ${enemy.name} attacks you. Your health is now ${playerHealth > 0 ? playerHealth : 0}.`);
    } else {
      console.log(`MISS! The ${enemy.name}'s attack failed.`);
    }
    if (playerHealth <= 0) {
      returnToTown(); // Call the function to handle defeat and set the flag.
      return false;
    }
  }
}
// Fight Logic ##############################################################################

const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);
console.log(' ')
const weaponPreference = prompt('What weapon would you like to start with?  | Sword | Axe | Bow | ');
console.log(`Great you have selected ${weaponPreference}, truly a great pick!`);
console.log(" ");
console.log(`Tip: Going back to town heals you and if you die you return to town`);
const firstChoice = prompt(`Do you want to complete some training, travel to town, or head to that ominous cave? `);
console.log(` `);
if (firstChoice === "complete some training") {
    console.log('Good idea, that will help with fighting the enemies later.');
    playerLocation = 'training'; // Set location for the loop
} else if (firstChoice === "travel to town") {
    console.log('Lets go see what they have in town.');
    playerLocation = 'town'; // Set location for the loop
} else { // Assumes any other answer is going to the cave
    console.log('Now why would you do that... lets do it then.');
    playerLocation = 'cave'; // Set location for the loop
}

while (true) {
  if (playerLocation === 'town') {
    if (justRespawned) {
      getToCave();
      justRespawned = false;
    } else {
      console.log("You are in the town square. Your health is full.");
      playerHealth = 10;
      if (hasTrained === false) {
        // If they haven't trained, show the training option.
        const choice = prompt("Where to next? [cave, training, quit] ");
        if (choice === 'cave') {
          playerLocation = 'cave';
        } else if (choice === 'training') {
          playerLocation = 'training';
        } else if (choice === 'quit') {
          closerToCentipede();
        }
      } else {
        // If they HAVE trained, the option is no longer available.
        console.log("The training grounds have nothing more to teach you.");
        const choice = prompt("Where to next? [cave, quit] ");
        if (choice === 'cave') {
          playerLocation = 'cave';
        } else if (choice === 'quit') {
          closerToCentipede();
        }
      }
    }
  } else if (playerLocation === 'training') {
    console.log("You are at the training grounds.");
    weaponsDamage.Sword = 5;
    weaponsDamage.Axe = 7;
    weaponsDamage.Bow = 3;
    hasTrained = true; //
    console.log("Your weapon damage has increased!");
    const choice = prompt("Finished training. Where to now? [town, cave] ");
    if (choice === 'town') {
      playerLocation = 'town';
    } else if (choice === 'cave') {
      playerLocation = 'cave';
    }
   else if (playerLocation === 'cave') {
    console.log("You are at the entrance of the ominous cave. It is dark and foreboding.");

    // Give the player options now that they are in the cave
    const choice = prompt("What will you do? [go deeper, leave] ");

    if (choice === 'go deeper') {
        console.log("You head deeper into the darkness... something approaches!");

        // The fight now happens here, after the player chooses to proceed.
        const playerWon = fight(enemies.snake);

        if (playerWon) {
            console.log("Victorious, you head back to town to recover.");
            playerLocation = 'town';
        } else {
            // If the player lost, the fight() function already sent them to town.
            // This just ensures the loop continues from the correct location.
            playerLocation = 'town';
        }
    } else if (choice === 'leave') {
        console.log("You decide not to risk it and return to the safety of the town.");
        playerLocation = 'town';
    }
  }
}
