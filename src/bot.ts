import { Bot } from "grammy";
import * as dotenv from 'dotenv';
import 'dotenv/config'
import axios from 'axios';
import { log } from 'console';
import fetch from 'node-fetch';






const url = 'https://api.mcstatus.io/v2/status/java/giomagi21.aternos.me'

const checkServerStatus = async (): Promise<boolean> => {
    try {
        const response = await axios.get('https://api.mcstatus.io/v2/status/java/giomagi21.aternos.me');
        const msg = response.data.motd.clean
        console.log(response.data);
        
        console.log(response.data.motd.clean);

        return msg === 'Welcome to the server of giomagi!';
    } catch (error) {
        console.error(error);
        return false;
    }
};

let prevStatus = false; // Initialize with the assumed initial status

setInterval(async () => {
    try {
        const status = await checkServerStatus();
        
        if (!prevStatus && status) {
            bot.api.sendMessage(-616189353, 'Il server è acceso, buon divertimento! Mi raccomando, occhio alle fiamme libere.');
            bot.api.sendMessage(529895213, 'Il server è acceso, buon divertimento! Mi raccomando, occhio alle fiamme libere.');

        } else if (prevStatus && !status) {
            bot.api.sendMessage(529895213, 'Il server è spento :( Ti aspetto alla prossima.');
            bot.api.sendMessage(-616189353, 'Il server è spento :( Ti aspetto alla prossima.');
        }
        
        prevStatus = status; // Always update the previous status for the next comparison
    } catch (error) {
        console.error('Error checking server status:', error);
    }
}, 10000); // 10 

// Load environment variables from .env file
dotenv.config();

// Now you can access environment variables like this:
const BOT_TOKEN = process.env.BOT_TOKEN  

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(BOT_TOKEN || ''); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply(ctx.from?.id + ''));
// Handle other messages.


// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();