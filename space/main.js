/**
 * learn how to make embeds and button
 * learn how to make button interaction
 * learn how to push random notification
 */

console.clear()
require("dotenv").config();
const fs =require('fs');
const { 
    Client,
    Events, 
    IntentsBitField, 
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ActionRowBuilder, 
    EmbedBuilder,
}= require('discord.js');
let users_data={}
let superuser=''
const iv100jar=[]
const server_owner='315712752113025034'

const reading_memory_storage=()=>{fs.readFile("space/src/memory.json", (err, data)=>{ 
      
    // Check for errors 
    if (err) throw err; 
   
    // Converting to JSON 
    users_data = JSON.parse(data); 
    superuser=users_data["SuperSu"]
    const iv100jar=users_data['100iv']
      
    //console.log(users); // Print users  
})}

const write_memory_storage=()=>{fs.writeFile("space/src/memory.json", JSON.stringify(users_data), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log("added new data <100%>..."); // Success 
})}

const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildIntegrations
] });
client.on('ready',(c)=>{
    try{
        //load essential data
        reading_memory_storage()
        console.log("essential data have been gathered in the memory")
        
        console.log(`Logging succesfull\n>${c.user.tag}`)
        //setting scanners
        console.log("loading scaners.....")
        notifier('1176159511237640202','0')
        notifier('1176159511237640202','5')
    }
    catch(error){
        console.log(error)
    }
})
client.on('messageCreate',(msg)=>{
    if(msg.author.bot==false){
        text=msg.content
        //!!!from here need to fix the bugs
        if(text.charAt(0)==='$'){
            text=text.slice(1,)
            if(text==='setupIV100' && (msg.author.id==superuser/**can || condition according channels */)){
                try{
                    if(users_data["iv100"].includes(msg.channelId)==false){
                        iv100jar.push(msg.channelId)
                        write_memory_storage()
                        users_data["iv100"]=iv100jar
                        msg.reply("Channel has been added in db without errors :)")
                    }
                    else{
                        msg.reply("data already exists in db")
                    }
                    
                }
                catch(err){
                    console.log(err)
                    msg.reply(`Error occured\nreport \`\`\`${err}\`\`\`\nto:\n***Master <@${superuser}>***`)
                }
            }
        }
    }
})

/**
 * custom message edits notification
 */
function embed_builds(data){
    const embed=new EmbedBuilder().setTitle(`${data}`)
            .setDescription('This is an embed description')
            .setColor('Random')
            .addFields({
                name:'field title',
                value:'some random coords',inline:true,
            });
            return embed
}
function notifier(Channel_Id,mess) {
    client.channels.fetch(Channel_Id)
      .then(async (channel) => {
        const reveal_button = new ButtonBuilder()
          .setLabel('Reveal')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('reveal_button');
  
        const gmap_button = new ButtonBuilder()
          .setLabel('Gmap')
          .setStyle(ButtonStyle.Primary)
          .setCustomId('gmap_button');
  
        const buttonRow = new ActionRowBuilder()
          .addComponents(reveal_button, gmap_button);
        embed=await embed_builds(mess)
        const reply = await channel.send({
          content: `choose a coord option ${mess}... .. .`,
          embeds:[embed],
          components: [buttonRow],
        });
  
        const filter = (interaction) => interaction;
        const collector = reply.createMessageComponentCollector({
          componentType: ComponentType.Button,
          filter,
        });
  
        collector.on('collect', async (interaction) => {
            // Check if reply has already been sent
            if (interaction.replied) {
              return; // Skip further processing if already replied
            }
          
            // Defer the reply with ephemeral option
            await interaction.deferReply({ ephemeral: true, content: 'Processing...' });
          
            try {
              if (interaction.customId === 'reveal_button') {
                await interaction.editReply(`You clicked reveal ${mess}`);
                return;
              }
              if (interaction.customId === 'gmap_button') {
                await interaction.editReply(`You clicked gmap ${mess}`);
                return;
              }
            } catch (e) {
              console.log(e);
            }
          });
      });
  }
client.login(process.env.token)