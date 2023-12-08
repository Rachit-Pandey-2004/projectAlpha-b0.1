console.clear()
require("dotenv").config();
const { Client,Events, IntentsBitField }= require('discord.js');
//https://discord.com/developers/docs/topics/gateway for intents refrence as these are the permission which bot can perform

const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
] });

client.on('ready',(c)=>{
    console.log(`Bot logged in as ${c.user.tag}`)
})
client.on('messageCreate',(message)=>{
    if(message.author.bot==false){
        if(message.content.charAt[0]==='$hi'){
            message.reply("hello")
        }
    }
})

client.login(process.env.token);

    
