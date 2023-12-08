console.clear()
const load=require('./register-commands')
require("dotenv").config();
const { Client,Events, IntentsBitField,EmbedBuilder }= require('discord.js');
//https://discord.com/developers/docs/topics/gateway for intents refrence as these are the permission which bot can perform

const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildIntegrations,
] });

client.on('ready',(c)=>{
    try{
        console.log(`Bot logged in as ${c.user.tag}`)
    } catch(error){
        console.log(error)
    }
})
client.on('messageCreate',(message)=>{
    if(message.author.bot==false){
        if(message.content==='$hi'){
            message.reply("hello")
        }
    }
})

client.on('interactionCreate',(interaction)=>{
    if(!interaction.isChatInputCommand())return;
    else{
        if(interaction.commandName==='hey'){
            interaction.reply(`hello! ${interaction.user.username}`);
        }
        else if(interaction.commandName==='embed'){
            const embed=new EmbedBuilder().setTitle('Embed Title')
            .setDescription('This is an embed description')
            .setColor('Random')
            .addFields({
                name:'field title',
                value:'some random coords',inline:true,
            });
            interaction.reply({embeds:[embed]});

        }
        else if(interaction.commandName==='ping'){
            interaction.reply(`\`\`\`Latency is ${Date.now()-interaction.createdTimestamp}ms. \nApi Latency is ${Math.round(client.ws.ping)}ms\`\`\``)
        }
        else if(interaction.commandName==='add'){
            var num1=interaction.options.get('first_number')?.value;//? is for
            var num2=interaction.options.get('second_number')?.value;
            interaction.reply(`\`\`\`Sum of ${num1} + ${num2} = ${num1+num2}\`\`\``)
        }
    }
})

client.login(process.env.token);

    
