#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const sleep =()=>{
    return new Promise((res)=>{
        setTimeout(res, 2000)
    })
}
async function welcome(){
    let rainbowTitle= chalkAnimation.neon(" Welcome to the Text-Based Fighting Adventure Game!\n");
    await sleep();
    rainbowTitle.stop();
   
}

await welcome()

interface Player {
  name: string;
  health: number;
  attack: number;
}

interface Enemy {
  name: string;
  health: number;
  attack: number;
}

async function startGame(): Promise<void> {
  

  const { playerName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'playerName',
      message: (chalk.greenBright('Enter your name:'))
    }
  ]);

  const player: Player = {
    name: playerName,
    health: 100,
    attack: getRandomNumber(25, 85)
  };

  const enemy: Enemy = {
    name: 'Enemy',
    health: 100,
    attack: getRandomNumber(25, 85)
  };

  console.log(`Hello, ${player.name}!`);
  console.log('Player Stats:');
  console.log(`Health: ${player.health}`);
  console.log(`Attack: ${player.attack}\n`);

  console.log('Enemy Stats:');
  console.log(`Health: ${enemy.health}`);
  console.log(`Attack: ${enemy.attack}\n`);

  while (player.health > 0 && enemy.health > 0) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: (chalk.greenBright('Choose an action:')),
        choices: ['Attack', 'Run', 'Heal', 'Exit']
      }
    ]);

    if (action === 'Attack') {
      const playerAttackValue = getRandomNumber(player.attack - 3, player.attack + 3);
      const enemyAttackValue = getRandomNumber(enemy.attack - 2, enemy.attack + 2);

      enemy.health -= playerAttackValue;
      player.health -= enemyAttackValue;

      console.log(`${player.name}! attacked the ${enemy.name} for ${playerAttackValue} damage.`);
      console.log(`The ${enemy.name} attacked ${player.name}! for ${enemyAttackValue} damage.\n`);

      console.log('Updated Stats:');
      console.log(`${player.name} Health: ${player.health}`);
      console.log(`Enemy Health: ${enemy.health}\n`);

      if (enemy.health <= 0) {
        console.log(`Congratulations! ${player.name}! defeated the ${enemy.name}!`);
      } else if (player.health <= 0) {
        console.log(`${player.name}! was defeated by the ${enemy.name}. Game Over.`);
      }
    } else if (action === 'Run') {
      console.log(`${player.name} managed to escape. Game Over.`);
      break;
    } else if (action === 'Heal') {
      const healAmount = getRandomNumber(15, 30);
      player.health += healAmount;
      player.health = Math.min(player.health, 100);

      console.log(`${player.name}! found a treasure box and healed ${player.name} for ${healAmount} health points.`);
      console.log(`${player.name}! current health: ${player.health}\n`);
    } else if (action === 'Exit') {
      console.log(`Thanks for playing ${player.name}! Goodbye.`);
      break;
    }
  }
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

startGame();
