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
        weakness: "Axe"
    }
}


const weaponPreference = prompt('What weapon would you like to start with?  | Sword | Axe | Bow | ');
console.log(`Great you have selected ${weaponPreference}, truly a great pick!`);
console.log(" ");
console.log(`Tip: Going back to town heals you and if you die you return to town`);
const firstChoice = prompt(`Do you want to complete some training, travel to town, or head to that ominous cave? `);
console.log(` `);
if (firstChoice === "complete some training") {
    console.log(`Good idea, your weapon damage has gotten stronger and that will help with fighting the enemies later`);
    console.log(' ');
    let pathChoice = prompt(`Now that training is done what would you like to do? Go to the ominious cave(you're insane) or go to town? `);
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


// Fight Logic ###################################################################################
// This function is responsible for asking the player to choose a weapon
// and will keep asking until it gets a valid choice.
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
  // Announce the start of the battle.
  console.log(`A wild ${enemies.name} appears!`);

  // Create a temporary variable for the enemy's health for this specific fight.
  // This avoids changing the original 'enemies' object.
  let enemyHealth = enemies.health;

  // This 'while' loop is the main combat loop. It continues as long as both
  // the player's health AND the enemy's health are greater than 0.
  while (playerHealth > 0 && enemyHealth > 0) {

    // --- 1. PLAYER'S TURN ---

    // Call our other function to let the player choose a weapon.
    // The returned object, e.g., { name: 'Axe', damage: 5 }, is stored here.
    const selectedWeapon = selectWeapon();

    // Simulate a 50% chance to hit. Math.random() returns a number between 0 and 0.99.
    // If it's less than 0.5, it's a "hit". Otherwise, it's a "miss".
    if (Math.random() < 0.5) {
      // The original code `enemyHealth -= selectedWeapon` would not work correctly.
      enemyHealth -= selectedWeapon.damage;

      // Tell the player they hit and show the enemy's remaining health.
      // The `(condition ? value_if_true : value_if_false)` part prevents showing negative health.
      console.log(`HIT! You attack the ${enemies.name}. Its health is now ${enemyHealth > 0 ? enemyHealth : 0}.`);
    } else {
      // If the random number was 0.5 or greater, the attack misses.
      console.log("MISS! Your attack failed.");
    }

    // After the attack, check if the enemy has been defeated.
    if (enemyHealth <= 0) {
      // If health is 0 or less, the player wins.
      console.log(`Congratulations! You defeated the ${enemies.name}!`);
      playerLevel++; // Increase the player's level.
      console.log(`You grew to level ${playerLevel}!\n`);

      // 'return true' exits the fight function and signals that the player won.
      return true;
    }

    // --- 2. ENEMY'S TURN ---

    console.log(`The ${enemies.name} prepares to attack...`);
    // The enemy also has a 50% chance to hit, using the same logic.
    if (Math.random() < 0.5) {
      // If the enemy hits, subtract its damage from the player's global health.
      playerHealth -= enemies.damage;
      console.log(`HIT! The ${enemies.name} attacks you. Your health is now ${playerHealth > 0 ? playerHealth : 0}.`);
    } else {
      console.log(`MISS! The ${enemies.name}'s attack failed.`);
    }

    // After the enemy attacks, check if the player has been defeated.
    if (playerHealth <= 0) {
      console.log("You have been defeated... You wake up back in town.");

      // 'return false' exits the fight function and signals that the player lost.
      return false;
    }
  }
}
fight();
// Fight Logic ##############################################################################
